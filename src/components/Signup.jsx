import React, { useState, useEffect } from 'react';
import './Signup.css';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import axios from 'axios';

function Signup() {
    const [loginSelected, setLoginSelected] = useState(false);
    const [signupSelected, setSignupSelected] = useState(true);
    const [cuisines, setCuisines] = useState();
    const [checkedState, setCheckedState] = useState();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3004/cuisines')
            .then((response) => {
                console.log(response.data);
                setCuisines(response.data);
                setCheckedState(new Array(response.data.length).fill(false));
            })
            .catch((error) => console.log(error));
    }, [])

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((cuisine, index) => index === position ? !cuisine : cuisine
        );

        setCheckedState(updatedCheckedState);
    }

    const handleLoginClick = () => {
        setLoginSelected(true);
        setSignupSelected(false);
    }

    const handleSignupClick = () => {
        setLoginSelected(false);
        setSignupSelected(true);
    }

    const handleSubmit = async () => {
        const userCuisineArray = [];
        console.log('checked state', checkedState);
        await checkedState.map((state, index) => {
            if (state === true) {
                userCuisineArray.push(index + 1);
            }
            return checkedState;
        })
        console.log(checkedState);
        console.log('user xuisine array', userCuisineArray);

        axios
            .post('http://localhost:3004/userInfo', {
                firstName: firstname,
                lastName: lastname,
                username: username,
                email: email,
                password: password,
                cuisines: userCuisineArray
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className="Signup">
            <div className="signup">
                <div className="signup-header">
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
                <div className="heading">
                    <div className="heading-icon">
                        <AccountBoxIcon />
                    </div>
                    <div className="heading-text">
                        <div className="signup-title">Register</div>
                        <div className="signup-sub-title">Please enter your details</div>
                    </div>
                </div>
                <div className="signup-field">
                    <div className="input-field">
                        <PersonOutlineOutlinedIcon />
                        <input type="text" className="firstname-input" placeholder="first name" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <PersonOutlineOutlinedIcon />
                        <input type="text" className="lastname-input" placeholder="last name" value={lastname} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <PersonOutlineOutlinedIcon />
                        <input type="username" className="username-input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <LockOutlinedIcon />
                        <input type="password" className="password-input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <EmailOutlinedIcon />
                        <input type="email" className="email-input" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                {cuisines && checkedState && (
                    <>
                        <div className="cuisine-header">
                            <div className="cuisine-icon">
                                <RestaurantOutlinedIcon />
                            </div>
                            <div className="cuisine-text">
                                Pick your favourite food
                            </div>
                        </div>
                        <div className="cuisines">
                            <ul className="cuisines-list">
                                {cuisines.map((cuisine, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="cuisines-list-item">
                                                <input type="checkbox" id={`custom-checkbox-${index}`} name={cuisine.name} value={cuisine.value} checked={checkedState[index]} onChange={() => handleOnChange(index)} />
                                                <label htmlFor={`custom-checkbox-${index}`}>{cuisine.name}</label>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </>
                )}
                <button className="login-button" onClick={handleSubmit} >Register</button>
            </div>
        </div>
    )
}

export default Signup
