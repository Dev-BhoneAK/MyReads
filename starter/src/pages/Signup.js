import React, {useState} from 'react';
import '../css/Login.css';
import {useNavigate} from "react-router-dom";
import {auth} from '../firebase';
import {createUserWithEmailAndPassword} from "firebase/auth";

const Signup = () => {

    const [message, setMessage] = useState("");
    const [signupData, setSignupData] = useState({
        'name': '',
        'email': '',
        'password': '',
        'confirmPassword': ''
    });
    const navigate = useNavigate();
    const submitInput = async (event) => {
        event.preventDefault();
        const {name, email, password,  confirmPassword} = signupData;

        if (password !== confirmPassword){
            setMessage('Password and Confirm Password should be the same');
            return false;
        }
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            (user._tokenResponse && user._tokenResponse.refreshToken !== '') && setMessage('User registration is successful.Please login with signup data.');
        }catch (e) {
            console.error(e);
            setMessage(e.message);
        }
    }

    const changeEvent = (event) => {
        const {name, value} = event.target;
        setSignupData({...signupData, [name]: value});
    }

    const focusEvent = (event) => {
        setMessage('');
    }

    return (
        <div>
            <form onSubmit={submitInput} id="signup">
                <h1>Sign Up Form</h1>
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" required="name" onChange={changeEvent} value={signupData.name}/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required="email" onChange={changeEvent} value={signupData.email}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required onChange={changeEvent} onFocus={focusEvent} value={signupData.password}/>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="confirmPassword" required onChange={changeEvent} onFocus={focusEvent} value={signupData.confirmPassword}/>
                    <input type="submit" value="Sign up" className="button"/>
                </div>
                {message && <h3 className="success-msg">{message}</h3>}
            </form>
        </div>
    );
}

export default Signup;