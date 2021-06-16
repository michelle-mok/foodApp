import React, { useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
import './FooterNavbar.css';
import { Link } from "react-router-dom";

function FooterNavbar() {
    const [home, setHome] = useState(true);
    const [chat, setChat] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleChatClick = () => {
        setHome(false);
        setChat(true);
        setEdit(false);
    }

    const handleHomeClick = () => {
        setHome(true);
        setChat(false);
        setEdit(false);
    }

    const handleEditClick = () => {
        setHome(false);
        setChat(false);
        setEdit(true);
    }

    return (
        <div className="footer-navbar">
            <ul className="navbar-list">
                <li className="navbar-list-item">
                    {home ? (
                        <div className="navbar-text-active" onClick={handleHomeClick}>
                            <Link to='/'>
                                <HomeIcon />
                                Home
                            </Link>
                        </div>
                    ) : (
                        <div className="navbar-text" onClick={handleHomeClick}>
                            <Link to='/'>
                                <HomeIcon />
                                Home
                            </Link>
                        </div>
                    )}
                </li>
                <li className="navbar-list-item">
                    {chat ? (
                        <div className="navbar-text-active" onClick={handleChatClick}>
                            <Link to='/chat'>
                                <ChatIcon />
                                Chat
                            </Link>
                        </div>
                    ) : (
                        <div className="navbar-text" onClick={handleChatClick}>
                            <Link to='/chat'>
                                <ChatIcon />
                                Chat
                            </Link>
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
