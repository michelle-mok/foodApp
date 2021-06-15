import React, { useState } from 'react';
import './LoginSignupHeader.css';

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
    )
}

export default LoginSignupHeader