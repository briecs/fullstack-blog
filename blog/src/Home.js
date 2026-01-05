import { useEffect, useState } from 'react';
import Bloglist from './Bloglist';



const Home = () => {
    const [blogs, setBlogs] = useState(null
        /*[{title: "Blog 1", author: "me", body: "content1", id: 1},
        {title: "Blog 2", author: "other1", body: "content2", id: 2},
        {title: "Blog 3", author: "other2", body: "content3", id: 3}]*/
);

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setBlogs(data);
        })
    }, []);

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }

    return (
        <div className="home">
            {blogs && <Bloglist blogs = { blogs } title = "Blogs" handleDelete = { handleDelete }/>}
        </div>
    );
}
 
export default Home;