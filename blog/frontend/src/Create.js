import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
import usePost from './usePost';

const Create = () => {
    const [ title,  setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const { user } = useContext(UserContext);
    const { startPost, isLoading, error, errorcode } = usePost('http://127.0.0.1:5000/api/posts');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, user };

        startPost(blog).then(postdata => {
            if (postdata) {
                console.log(postdata.msg);
                history.push(`/blogs/${ postdata.id }`);
            }
        });
    }

    return (
        <div className="create">
            <h2>New Blog</h2>
            <form onSubmit={ handleSubmit }>
                <label>Title</label>
                <input type="text" required value={ title } onChange={(e) => setTitle(e.target.value)}></input>
                <label>Body</label>
                <textarea required value={ body } onChange={(e) => setBody(e.target.value)}></textarea>
                { !isLoading && <button>Post</button>}
                { isLoading && <button disabled>Blog being added...</button>}
            </form>
        </div>
    );
}
 
export default Create;