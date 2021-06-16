import React, { useState, useContext } from 'react';
import './Login.css';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { Link } from 'react-router-dom';
import { userLogin, foodAppContext } from '../store';
import { useHistory } from "react-router-dom";

function Login() {
    let history = useHistory();
    const { store, dispatch } = useContext(foodAppContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = async () => {
        userLogin(dispatch, username, password, history);
    }

    return (
        <div className="Login">
            <div className="login">
                <div className="logo"></div>
                <div className="title">What to eat?</div>
                <div className="sub-title">We help you decide</div>
                <div className="field">
                    <div className="username">
                        <PersonOutlineOutlinedIcon />
                        <input type="text" className="username-input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="password">
                        <PersonOutlineOutlinedIcon />
                        <input type="password" className="password-input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <button className="login-button" onClick={handleLoginClick}>Log in</button>
            </div>
        </div>
    )
}

export default Login
