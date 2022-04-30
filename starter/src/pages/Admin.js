import React, {useState} from 'react';
import {Link, Outlet} from "react-router-dom";

const Admin = () => {

    const [active, setActive] = useState("login");
    const addActiveClass = (e) => {
        const clicked = e.target.id;
        setActive(clicked);
    }

    return (
        <div className="form-container">
            <div className="forms">
                <ul className="tab-group">
                    <Link to="/login"><li className={`tab ${active === 'login' && 'active'}`} id="login" onClick={addActiveClass}>Log In</li></Link>
                    <Link to="/signup"><li className={`tab ${active === 'signup' && 'active'}`} id="signup" onClick={addActiveClass}>Sign Up</li></Link>
                </ul>

                {/*<form action="#" id="signup">*/}
                {/*    <h1>Login Form</h1>*/}
                {/*    <div className="input-field">*/}
                {/*        <label htmlFor="email">Email</label>*/}
                {/*        <input type="email" name="email" required="email"/>*/}
                {/*        <label htmlFor="password">Password</label>*/}
                {/*        <input type="password" name="password" required/>*/}
                {/*        <input type="submit" value="Login" className="button"/>*/}
                {/*    </div>*/}
                {/*</form>*/}
                <Outlet />
            </div>
        </div>
    );
}

export default Admin;