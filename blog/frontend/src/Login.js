import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";


const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoggingIn, setIsLoggingIn ] = useState(false);
    const history = useHistory();
    const { login } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginDetails = { username, password };
        setIsLoggingIn(true);

        setTimeout(() => {
            login(loginDetails);
            setIsLoggingIn(false);
            history.push('/');
        }, 1000);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={ handleSubmit }>
                <label>Username</label>
                <input type='text' required value={ username } onChange={(e) => setUsername(e.target.value)}></input>
                <label>Password</label>
                <input type='password' required value={ password } onChange={(e) => setPassword(e.target.value)}></input>
                <p>Don't have an account? <Link to='/register'>Register here</Link>.</p>
                { !isLoggingIn && <button>Log in</button>}
                { isLoggingIn && <button disabled>Logging in...</button>}
            </form>
        </div>
    );
}
 
export default Login;