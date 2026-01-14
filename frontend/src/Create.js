import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import usePost from './usePost';

const Create = () => {
    const [ title,  setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const access_token = localStorage.getItem('access_token');
    const { startPost, isLoading, error, errorcode } = usePost('http://127.0.0.1:5000/api/posts');
    const history = useHistory();

    useEffect(() => {
        if (!access_token) {
            history.push('/login');
        }
    }, [access_token, history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body };

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
                <input type="text" autoFocus required value={ title } onChange={(e) => setTitle(e.target.value)}></input>
                <label>Body</label>
                <textarea required value={ body } onChange={(e) => setBody(e.target.value)}></textarea>
                { !isLoading && <button>Post</button>}
                { isLoading && <button disabled>Blog being added...</button>}
            </form>
        </div>
    );
}
 
export default Create;