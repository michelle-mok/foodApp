import React, { useState, useContext } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
import './FooterNavbar.css';
import { useHistory } from "react-router-dom";
import { foodAppContext } from '../store.js';

function FooterNavbar() {
    const [home, setHome] = useState(true);
    const [chat, setChat] = useState(false);
    const [edit, setEdit] = useState(false);
    const { store } = useContext(foodAppContext);
    const { userInfo } = store;
    const history = useHistory();

    const handleChatClick = () => {
        setHome(false);
        setChat(true);
        setEdit(false);
        if (userInfo) {
            history.push('/chatrooms')
        } else {
            history.push('/');
            setHome(true);
            setChat(false);
            setEdit(false);
        }
    }

    const handleHomeClick = () => {
        setHome(true);
        setChat(false);
        setEdit(false);
        if (userInfo) {
            history.push('/home')
        } else {
            history.push('/');
        }
    }

    const handleEditClick = () => {
        setHome(false);
        setChat(false);
        setEdit(true);
        if (userInfo) {
            history.push('/edit')
        } else {
            history.push('/');
            setHome(true);
            setChat(false);
            setEdit(false);
        }
    }

    console.log(userInfo);
    return (
        <div className="footer-navbar">
            <ul className="navbar-list">
                <li className="navbar-list-item">
                    {home ? (
                        <div className="navbar-text-active" onClick={handleHomeClick}>
                            <HomeIcon />
                            Home
                        </div>
                    ) : (
                        <div className="navbar-text" onClick={handleHomeClick}>
                            <HomeIcon />
                            Home
                        </div>
                    )}
                </li>
                <li className="navbar-list-item">
                    {chat ? (
                        <div className="navbar-text-active" onClick={handleChatClick}>
                            <ChatIcon />
                            Chat
                        </div>
                    ) : (
                        <div className="navbar-text" onClick={handleChatClick}>
                            <ChatIcon />
                            Chat
                        </div>
                    )}
                </li>
                <li className="navbar-list-item">
                    {edit ? (
                        <div className="navbar-text-active" onClick={handleEditClick}>
                            <EditIcon />
                            Edit
                        </div>
                    ) : (
                        <div className="navbar-text" onClick={handleEditClick}>
                            <EditIcon />
                            Edit
                        </div>
                    )}
                </li>
            </ul>

        </div>
    )
}

export default FooterNavbar
