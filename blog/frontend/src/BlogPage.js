import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const BlogPage = () => {
    const { id } = useParams();
    const { data: blog, IsLoading, error } = useFetch(`http://127.0.0.1:5000/api/posts/${id}`)
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

    return (
        <div className="blog-content">
            { IsLoading && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>By { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={ () => handleDelete() }>Delete post</button>
                </article>
            ) }
        </div>
    );
}
 
export default BlogPage;