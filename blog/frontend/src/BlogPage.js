import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import BlogNotFound from "./BlogNotFound";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const BlogPage = () => {
    const { id } = useParams();
    const { data: blog, IsLoading, error, errorcode } = useFetch(`http://127.0.0.1:5000/api/posts/${id}`);
    const { user } = useContext(UserContext);
    const history = useHistory();

    const handleDelete = () => {
        fetch(`http://127.0.0.1:5000/api/posts/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data.msg);
            history.push('/');
        });
    }

    if (errorcode === 404) {
        return <BlogNotFound title='Sorry,' message={ error } errorcode='404'/>;
    }

    if (errorcode === 500) {
        return <BlogNotFound title='Oops!' message={ error } errorcode='500'/>
    }

    return (
        <div className="blog-content">
            { IsLoading && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>By { blog.author }</p>
                    <div>{ blog.body }</div>
                    { user && blog.id === user.id && <button onClick={ () => handleDelete() }>Delete post</button>}
                </article>
            )}
        </div>
    );
}
 
export default BlogPage;