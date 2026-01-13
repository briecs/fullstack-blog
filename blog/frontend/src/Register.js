import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

const Register = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confpassword, setConfpassword ] = useState('');
    const [ isRegistering, setIsRegistering ] = useState(false);
    const history = useHistory();
    const { login } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confpassword) {
            alert('Passwords do not match.');
            return;
        }

        const regDetails = { username, password };
        setIsRegistering(true);

        setTimeout(() => {
            login(regDetails);
            setIsRegistering(false);
            history.push('/');
        }, 1000);
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={ handleSubmit }>
                <label>Username</label>
                <input type='text' required value={ username } onChange={(e) => setUsername(e.target.value)}></input>
                <label>Password</label>
                <input type='password' required value={ password } onChange={(e) => setPassword(e.target.value)}></input>
                <label>Confirm password</label>
                <input type='password' required value={ confpassword } onChange={(e) => setConfpassword(e.target.value)}></input>
                { !isRegistering && <button>Register</button>}
                { isRegistering && <button disabled>Creating account...</button>}
            </form>
        </div>
    );
}
 
export default Register;