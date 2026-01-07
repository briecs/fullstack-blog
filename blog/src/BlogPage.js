import { useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { useParams } from "react-router-dom";

const BlogPage = () => {
    const { id } = useParams();
    const { data: blog, IsLoading, error } = useFetch('http://localhost:8000/blogs/' + id)
    const history = useHistory();

    const handleDelete = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
            console.log("blog deleted");
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