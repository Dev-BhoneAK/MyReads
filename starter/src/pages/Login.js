import React, {useState} from 'react';
import '../css/Login.css';
import {signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import {auth} from "../firebase";

const Login = () => {
    const [message, setMessage] = useState("");
    const [loginData, setLoginData] = useState({
       'email': '',
        'password': ''
    });
    const navigate = useNavigate();
    const submitInput = async (event) => {
        event.preventDefault();
        const {email, password} = loginData;
        try {
            const responseData = await signInWithEmailAndPassword(auth, email, password);
            if(responseData._tokenResponse && responseData._tokenResponse.refreshToken !== ''){
                sessionStorage.setItem('user-token', responseData._tokenResponse.refreshToken);
                navigate('/home');
            }
        }catch (e) {
            setMessage(e.message);
        }
    }

    const changeEvent = (event) => {
        const {name, value} = event.target;
        setLoginData({...loginData, [name]: value});
    }

    const focusEvent = (event) => {
        setMessage('');
    }

    return (
        <div>
            <form onSubmit={submitInput} id="login">
                <h1>Login Form</h1>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required="email" onChange={changeEvent} onFocus={focusEvent} value={loginData.email}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required onChange={changeEvent} onFocus={focusEvent} value={loginData.password}/>
                    <input type="submit" value="Login" className="button"/>
                </div>
                {message && <h3 className="message-alert">{message}</h3>}
            </form>
        </div>
    );
}

export default Login;