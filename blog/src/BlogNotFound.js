import { Link } from "react-router-dom";

const BlogNotFound = () => {
    return (
        <div className="not-found">
            <h2>Page not found</h2>
            <p>Back to <Link to='/'>home</Link></p>
        </div>
    );
}
 
export default BlogNotFound;