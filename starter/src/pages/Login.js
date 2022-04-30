import React, {useState} from 'react';
import '../css/Login.css';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {Route, Routes, Outlet, Link, useNavigate} from 'react-router-dom';
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
            // console.log(returnData);
        }catch (e) {
            setMessage(e.message);
        }
        // const loginUser = FormSerialize(event.target, {hash: true});
        // const userCredentials = JSON.parse(sessionStorage.getItem('user-credentials'));
        // if((loginUser.email === userCredentials.email) && (loginUser.password === userCredentials.password)){
        //     const token = "test-token-123";
        //     sessionStorage.setItem('user-token', token);
        //     // console.log(sessionStorage.getItem('user-token'));
        //     // const abc = JSON.stringify(token);
        //     navigate('/home');
        // }else {
        //     setMessage("Wrong Password");
        // }
    }

    const changeEvent = (event) => {
        const {name, value} = event.target;
        setLoginData({...loginData, [name]: value});
    }

    return (
        <div>
            <form onSubmit={submitInput} id="login">
                <h1>Login Form</h1>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required="email" onChange={changeEvent} value={loginData.email}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required onChange={changeEvent} value={loginData.password}/>
                    <input type="submit" value="Login" className="button"/>
                </div>
                {message && <h3 className="message-alert">{message}</h3>}
            </form>
        </div>
    );
}

export default Login;