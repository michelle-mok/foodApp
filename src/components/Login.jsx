import React, { useState } from 'react';
import './Login.css';
import LoginSignupHeader from './LoginSignupHeader';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

function Login() {

    return (
        <div className="Login">
            <div className="login">
                <LoginSignupHeader />
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
