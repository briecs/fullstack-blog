from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

CORS(app)

#db set-up
basedir = os.path.abspath(os.path.dirname("blog.db"))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "blog.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

#jwt set-up
app.config["JWT_SECRET_KEY"] = "jwtsecret"
jwt = JWTManager(app)

#defining model for users
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    posts = db.relationship("Post", back_populates="author", lazy=True)

#defining model for posts
class Post(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100), nullable = False)
    body = db.Column(db.Text, nullable = False)
    author = db.relationship("User", back_populates="posts")
    author_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable = False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "author": self.author.username
        }
    
#reigistration/logging in
@app.route("/api/register", methods=["POST"])
def add_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "That username is already taken."}), 400
    
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=str(new_user.id))
    return jsonify({
        "access_token": access_token,
        "msg":"User successfully registered",
        "user": {
            "username": new_user.username,
            "id": new_user.id
            }
        }), 201

@app.route("/api/login", methods=["POST"])
def check_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user = User.query.filter_by(username=username, password=password).first()

    if user:
        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            "access_token": access_token,
            "msg": f"Logged in as {user.username}.",
            "user": {
                "username": user.username,
                "id": user.id
            }
        }), 200
        
    return jsonify({"msg": "Invalid username or password."}), 401

#creating posts
@app.route("/api/posts", methods=["POST"])
@jwt_required()
def create_post():
    user_id = get_jwt_identity()
    data = request.get_json()
    post = Post(title=data.get("title"), body=data.get("body"), author_id=user_id)
    db.session.add(post)
    db.session.commit()
    return jsonify({"id": post.id, "msg":"Blog successfully added"}), 201

#getting posts
@app.route("/api/posts", methods=["GET"])
def get_all_posts():
    posts = Post.query.all()
    posts_to_convert = [post.to_dict() for post in posts]
    return jsonify(posts_to_convert)

@app.route("/api/posts/<int:post_id>", methods=["GET"])
def get_single_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"msg": "That blog does not exist"}), 404
    
    return jsonify(post.to_dict())

#deleting posts
@app.route("/api/posts/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"msg": "Post not found, deletion failed."}), 404
    
    db.session.delete(post)
    db.session.commit()
    return jsonify({"msg": "Post deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)