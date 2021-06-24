import React, { useState, useContext } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import './FooterNavbar.css';
import { useHistory } from "react-router-dom";
import { foodAppContext, userLogout } from '../store.js';

function FooterNavbar() {
    const [home, setHome] = useState(true);
    const [chat, setChat] = useState(false);
    const [edit, setEdit] = useState(false);
    const [logout, setLogout] = useState(false);
    const { store } = useContext(foodAppContext);
    const { userInfo } = store;
    const history = useHistory();

    const handleChatClick = () => {
        setHome(false);
        setChat(true);
        setEdit(false);
        setLogout(false);
        history.push('/chatrooms')
    }

    const handleHomeClick = () => {
        setHome(true);
        setChat(false);
        setEdit(false);
        setLogout(false);
        history.push('/home')
    }

    const handleEditClick = () => {
        setHome(false);
        setChat(false);
        setEdit(true);
        setLogout(false);
        history.push('/edit')
    }

    const handleLogoutClick = () => {
        setHome(false);
        setChat(false);
        setEdit(false);
        setLogout(true);
        userLogout(history);
    }

    console.log(userInfo);
    return (
        <>
            <div className="footer-navbar">
                {userInfo && (
                    <ul className="navbar-list">
                        <li className="navbar-list-item">
                            <div className={home ? "navbar-text-active" : "navbar-text"} onClick={handleHomeClick}>
                                <HomeIcon />
                                Home
                            </div>
                        </li>
                        <li className="navbar-list-item">
                            <div className={chat ? "navbar-text-active" : "navbar-text"} onClick={handleChatClick}>
                                <ChatIcon />
                                Chat
                            </div>
                        </li>
                        <li className="navbar-list-item">
                            <div className={edit ? "navbar-text-active" : "navbar-text"} onClick={handleEditClick}>
                                <PersonIcon />
                                Profile
                            </div>
                        </li>
                        <li className="navbar-list-item">
                            <div className={logout ? "navbar-text-active" : "navbar-text"} onClick={handleLogoutClick}>
                                <ExitToAppIcon />
                                Log Out
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </>
    )
}

export default FooterNavbar
