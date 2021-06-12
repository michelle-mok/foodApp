import React, { useState } from 'react';
import './Login.css';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

function Login() {
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
        <div className="Login">
            <div className="login">
                <div className="header">
                    {loginSelected ? (
                        <div className="active" onClick={handleLoginClick}>
                            <h3>Log in</h3>
                        </div>
                    ) : (
                        <div className="inactive" onClick={handleLoginClick}>
                            <h3>Log in</h3>
                        </div>
                    )}
                    {signupSelected ? (
                        <div className="active" onClick={handleSignupClick}>
                            <h3>Sign up</h3>
                        </div>
                    ) : (
                        <div className="inactive" onClick={handleSignupClick}>
                            <h3>Sign up</h3>
                        </div>
                    )}
                </div>
                <div className="logo"></div>
                <div className="title">What to eat?</div>
                <div className="sub-title">We help you decide</div>
                <div className="field">
                    <div className="username">
                        <PersonOutlineOutlinedIcon />
                        <input type="text" className="username-input" placeholder="username" />
                    </div>
                    <div className="password">
                        <PersonOutlineOutlinedIcon />
                        <input type="password" className="password-input" placeholder="password" />
                    </div>
                </div>
                <button className="login-button">Log in</button>
            </div>
        </div>
    )
}

export default Login
