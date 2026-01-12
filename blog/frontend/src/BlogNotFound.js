import { Link } from "react-router-dom";

const BlogNotFound = ({ title, message, errorcode }) => {
    return (
        <div className="not-found">
            <h2>{ title }</h2>
            { errorcode === '404' && <p>{ message } Back to <Link to='/'>home</Link>.</p>}
            { errorcode === '500' && <p>{ message } Please <Link to='#' onClick= {() => window.location.reload()}>try again</Link>.</p>}
        </div>
    );
}
 
export default BlogNotFound;