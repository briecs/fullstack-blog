import BlogList from './BlogList';
import useFetch from './useFetch';



const Home = () => {
    const { data: blogs, IsLoading, error } = useFetch('http://localhost:8000/blogs');

    return (
        <div className="home">
            {IsLoading && <div>Loading...</div>}
            {error && <div>{ error }</div>}
            {blogs && <BlogList blogs = { blogs } title = "Blogs"/>}
        </div>
    );
}
 
export default Home;