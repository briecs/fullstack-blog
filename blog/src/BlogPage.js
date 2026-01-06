import useFetch from "./useFetch";
import { useParams } from "react-router-dom";

const BlogPage = () => {
    const { id } = useParams();
    const { data: blog, IsLoading, error } = useFetch('http://localhost:8000/blogs/' + id)

    return (
        <div className="blog-content">
            { IsLoading && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>By { blog.author }</p>
                    <div>{ blog.body }</div>
                </article>
            ) }
        </div>
    );
}
 
export default BlogPage;