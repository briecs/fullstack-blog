import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useContext } from 'react';

const Navbar = () => {
    const { user, logout } = useContext(UserContext);

    return (
        <nav className="navbar">
            <h1><Link to="/">BlogSite</Link></h1>
            <div className="links">
            { user ? (
                <>
                    <Link to='/create'>New Blog</Link>
                    <Link to='/' onClick={ logout }>Log Out</Link>
                </>
            ) : (
                <Link to='/login'>Log In</Link>
            )}
            </div>
        </nav>
    );
}
 
export default Navbar;