import React, { useState } from 'react';
import './LoginSignupHeader.css';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

function LoginSignupHeader() {
    const [loginSelected, setLoginSelected] = useState(true);
    const [signupSelected, setSignupSelected] = useState(false);

    const handleLoginClick = () => {
        setLoginSelected(true);
        setSignupSelected(false);
    }

    const handleSignupClick = () => {
        setLoginSelected(false);
        setSignupSelected(true);
    }
    return (
        <div className="login-signup">
            <div className="login-signup-header">
                <div className={loginSelected ? "active" : "inactive"} onClick={handleLoginClick}>
                    <h3>Log in</h3>
                </div>
                <div className={signupSelected ? "active" : "inactive"} onClick={handleSignupClick}>
                    <h3>Sign up</h3>
                </div>
            </div>
            {loginSelected && (
                <Login />
            )}
            {signupSelected && (
                <Signup />
            )}
        </div>

    )
}

export default LoginSignupHeader
