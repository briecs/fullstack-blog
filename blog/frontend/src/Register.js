import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";
import usePost from "./usePost";
import { Link } from "react-router-dom";

const Register = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confpassword, setConfpassword ] = useState('');
    const history = useHistory();
    const { login } = useContext(UserContext);
    const { startPost, isLoading, error, errorcode } = usePost('http://127.0.0.1:5000/api/register');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confpassword) {
            alert('Passwords do not match.');
            return;
        }

        const regDetails = { username, password };
        startPost(regDetails).then(postdata => {
            if (postdata) {
                login(postdata);
                console.log(postdata.msg);
                history.push('/');
            }
        });
    }

    return (
        <div className='login-register'>
            <h2>Register</h2>
            <form onSubmit={ handleSubmit }>
                <div className='set'>
                    <label>Username:</label>
                    <input type='text' autoFocus required value={ username } onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className='set'>
                    <label>Password:</label>
                    <input type='password' required value={ password } onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className='set'>
                    <label>Confirm password:</label>
                    <input type='password' required value={ confpassword } onChange={(e) => setConfpassword(e.target.value)}></input>
                </div>
                <p>Already have an account? <Link to='/login'>Log in here</Link>.</p>
                { !isLoading && <button>Register</button>}
                { isLoading && <button disabled>Creating account...</button>}
            </form>
        </div>
    );
}
 
export default Register;