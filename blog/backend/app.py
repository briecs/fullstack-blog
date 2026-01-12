from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

CORS(app)

basedir = os.path.abspath(os.path.dirname("blog.db"))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "blog.db")
#app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

#defining model for posts
class Post(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100), nullable = False)
    body = db.Column(db.Text, nullable = False)
    author = db.Column(db.String(50), nullable = False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "author": self.author
        }

@app.route("/api/posts", methods=["GET"])
def get_all_posts():
    posts = Post.query.all()
    posts_to_convert = [post.to_dict() for post in posts] 
    return jsonify(posts_to_convert)

@app.route("/api/posts", methods=["POST"])
def create_post():
    data = request.get_json()
    post = Post(title=data.get("title"), body=data.get("body"), author=data.get("author"))
    db.session.add(post)
    db.session.commit()
    return jsonify({"id": post.id, "msg":"blog successfully added"}), 201

@app.route("/api/posts/<int:post_id>", methods=["GET"])
def get_single_post(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify(post.to_dict())

@app.route("/api/posts/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({"msg": "post deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)