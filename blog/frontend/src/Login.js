import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";
import usePost from "./usePost";

const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const history = useHistory();
    const { login } = useContext(UserContext);
    const { startPost, isLoading, error, errorcode } = usePost('http://127.0.0.1:5000/api/login');

    const handleSubmit = (e) => {
        e.preventDefault();
        const regDetails = { username, password };
        startPost(regDetails).then(postdata => {
            if (postdata) {
                login(postdata);
                console.log(postdata.msg);
                history.push('/');
            }
        });
    };

    return (
        <div className='login-register'>
            <h2>Login</h2>
            <form onSubmit={ handleSubmit }>
                <div className='set'>
                    <label>Username:</label>
                    <input type='text' required value={ username } onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className='set'>
                    <label>Password:</label>
                    <input type='password' required value={ password } onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <p>Don't have an account? <Link to='/register'>Register here</Link>.</p>
                { !isLoading && <button>Log in</button>}
                { isLoading && <button disabled>Logging in...</button>}
            </form>
        </div>
    );
}
 
export default Login;