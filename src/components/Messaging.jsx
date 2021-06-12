import React from 'react';
import SideBar from './Sidebar.jsx';
import Chat from './Chat.jsx';
import './Messaging.css';

function Messaging() {
    return (
        <div className="messaging">
            <div className="messaging_body">
                <SideBar />
                <Chat />
            </div>
        </div>
    )
}

export default Messaging
