import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
const [ title,  setTitle ] = useState('');
const [ body, setBody ] = useState('');
const [ author, setAuthor ] = useState('');
const [ isAdding, setIsAdding ] = useState(false);
const history = useHistory();

const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author }

    setIsAdding(true);

    fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(blog)
    }).then(res => {
        return(
            res.json()
        );
    }).then((data) => {
        console.log("blog added");
        setIsAdding(false);
        history.push('/blogs/' + data.id);
    })
}

    return (
        <div className="create">
            <h2>New Blog</h2>
            <form onSubmit={ handleSubmit }>
                <label>Title</label>
                <input type="text" required value={ title } onChange={(e) => setTitle(e.target.value)}></input>
                <label>Body</label>
                <textarea required value={ body } onChange={(e) => setBody(e.target.value)}></textarea>
                <label>Author</label>
                <input type="text" required value={ author } onChange={(e) => setAuthor(e.target.value)}></input>
                { !isAdding && <button>Post</button>}
                { isAdding && <button>Blog being added...</button>}
            </form>
        </div>
    );
}
 
export default Create;