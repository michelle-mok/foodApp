import React, { useEffect, useState, useContext } from 'react';
import './Rooms.css';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getChatRoomId, foodAppContext } from '../store.js';

function Rooms({ rooms }) {
    let history = useHistory();
    const { store, dispatch } = useContext(foodAppContext);
    const handleChatClick = (id) => {
        console.log('inside chatclick', id);
        getChatRoomId(dispatch, id, history);
    }

    return (
        <>
            {rooms && (
                <div className="rooms">
                    {rooms.map((room) => {
                        console.log('room', room.id);
                        return (
                            <div className="sidebarChat" value={room.id} key={room.id} onClick={() => handleChatClick(room.id)}>
                                <Avatar />
                                <div className="sidebarChat_info">
                                    <h2>{room.name}</h2>
                                    <p>{room.lastMessage}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default Rooms
