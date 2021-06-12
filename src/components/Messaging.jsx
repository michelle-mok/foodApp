import React, { useEffect, useState } from 'react';
import SideBar from './Sidebar.jsx';
import Chat from './Chat.jsx';
import './Messaging.css';
import Pusher from 'pusher-js';
import axios from 'axios';

function Messaging() {
    const [messages, setMessages] = useState('');

    useEffect(() => {
        const BACKEND_URL = 'http://localhost:3004';
        axios
            .get(BACKEND_URL + '/messages/2')
            .then((response) => {
                console.log('messages ====', response.data);
                setMessages(response.data);
            })
            .catch((error) => console.log(error))
    }, []);

    useEffect(() => {
        const pusher = new Pusher('1a237dca1649981ed002', {
            cluster: 'ap1'
        });

        var channel = pusher.subscribe("messages");
        channel.bind("inserted", function (data) {
            setMessages([...messages, data])
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages]);

    return (
        <div className="messaging">
            <div className="messaging_body">
                <SideBar />
                <Chat messages={messages} />
            </div>
        </div>
    )
}

export default Messaging
