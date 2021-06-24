import React, { useEffect, useState, useContext } from 'react'
import { foodAppContext, updateUser, getEditPageCuisines } from '../store';
import EditIcon from '@material-ui/icons/Edit';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import './Signup.css';
import { useHistory } from 'react-router-dom';
import PhotoUploads from './PhotoUploads';

function Edit() {
    const history = useHistory();
    const { store, dispatch } = useContext(foodAppContext);
    const { userInfo, userCuisines } = store;
    const [cuisines, setCuisines] = useState([]);
    const [checkedState, setCheckedState] = useState([]);
    const [firstname, setFirstName] = useState(userInfo.firstName);
    const [lastname, setLastName] = useState(userInfo.lastName);
    const [username, setUsername] = useState(userInfo.username);
    const [email, setEmail] = useState(userInfo.email);
    const [image, setImage] = useState(userInfo.profilePic);

    useEffect(() => {
        console.log('user cuisines edit page', userCuisines);
        getEditPageCuisines(setCheckedState, setCuisines, userCuisines);
    }, []);

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((cuisine, index) => index === position ? !cuisine : cuisine
        );
        setCheckedState(updatedCheckedState);
    }

    const handleSubmit = () => {
        const userCuisineArray = [];
        console.log('checked state', checkedState);
        checkedState.map((state, index) => {
            if (state === true) {
                userCuisineArray.push(index + 1);
            }
            return checkedState;
        })

        // setFirstName('');
        // setLastName('');
        // setUsername('');
        // setEmail('');
        // setImage('');
        console.log('user xuisine array', userCuisineArray);
        updateUser(dispatch, firstname, lastname, username, email, image, userCuisineArray);
        history.push('/home');
    }

    console.log('checked state', checkedState);

    return (
        <div className="edit">
            <div className="Signup">
                <div className="signup">
                    <div className="heading">
                        <div className="heading-icon">
                            <EditIcon />
                        </div>
                        <div className="heading-text">
                            <div className="signup-title">Edit details  </div>
                            <div className="signup-sub-title">Need to make changes?</div>
                        </div>
                    </div>
                    <div className="signup-field">
                        <div className="input-field">
                            <PersonOutlineOutlinedIcon />
                            <input type="text" className="firstname-input" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <PersonOutlineOutlinedIcon />
                            <input type="text" className="lastname-input" value={lastname} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <PersonOutlineOutlinedIcon />
                            <input type="username" className="username-input" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        {/* <div className="input-field">
                        <LockOutlinedIcon />
                        <input type="password" className="password-input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div> */}
                        <div className="input-field">
                            <EmailOutlinedIcon />
                            <input type="email" className="email-input" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                    <button className="signup-button" onClick={handleSubmit} >Save details</button>
                </div>
            </div >
        </div>
    )
}

export default Edit
