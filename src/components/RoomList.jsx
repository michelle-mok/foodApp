import React, { useState, useEffect, useContext } from 'react';
import './RoomList.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Rooms from './Rooms.jsx';
import { foodAppContext, getOneUser, loadRooms } from '../store';

function RoomList() {
    const [rooms, setRooms] = useState([]);
    const { store, dispatch } = useContext(foodAppContext);
    const { userInfo } = store;

    useEffect(() => {
        if (!userInfo) {
            getOneUser(dispatch);
        }
        loadRooms(setRooms);
    }, []);

    return (
        <div className="sidebar">
            {userInfo && (
                <div className="sidebar_header">
                    <Avatar src={userInfo.profilePic} />
                    <div className="sidebar_headerRight">
                        {/* <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton> */}
                        <h2>Chats</h2>
                    </div>
                </div>
            )}
            {/* <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchIcon />
                    <input type="text" placeholder="search" />
                </div>
            </div> */}
            <div className="sidebar_chats">
                <Rooms rooms={rooms} />
            </div>
        </div>
    )
}

export default RoomList
