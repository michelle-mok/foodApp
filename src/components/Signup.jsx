import React, { useState, useEffect, useContext } from 'react';
import './Signup.css';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { foodAppContext, loadCuisines, newUser, getCheckedState } from '../store';
import { useHistory } from 'react-router-dom';
import PhotoUploads from './PhotoUploads';

function Signup() {
    let history = useHistory();
    const { store, dispatch } = useContext(foodAppContext);
    const [cuisines, setCuisines] = useState();
    const [checkedState, setCheckedState] = useState();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        loadCuisines(setCuisines, setCheckedState);
    }, [])

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((cuisine, index) => index === position ? !cuisine : cuisine
        );
        setCheckedState(updatedCheckedState);
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
        getCheckedState(dispatch, checkedState);
        console.log('user xuisine array', userCuisineArray);

        newUser(dispatch, history, firstname, lastname, username, email, password, image, userCuisineArray);
    }

    return (
        <div className="Signup">
            <div className="signup">
                <div className="heading">
                    <div className="heading-icon">
                        <AccountBoxIcon />
                    </div>
                    <div className="heading-text">
                        <div className="signup-title">Sign up! </div>
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
                <PhotoUploads image={image} setImage={setImage} />
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
                <button className="signup-button" onClick={handleSubmit} >Register</button>
            </div>
        </div >
    )
}

export default Signup
