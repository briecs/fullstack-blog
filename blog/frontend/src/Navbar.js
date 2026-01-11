import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1><Link to="/">BlogSite</Link></h1>
            <div className="links">
                <Link to='/create'>New Blog</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;