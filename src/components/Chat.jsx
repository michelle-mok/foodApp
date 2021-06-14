import React, { useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from 'axios';

function Chat({ messages }) {
    const [input, setInput] = useState('');

    const sendMessage = (event) => {
        event.preventDefault();

        const BACKEND_URL = 'http://localhost:3004';
        axios
            .post(BACKEND_URL + '/newMessage', {
                receiverId: 2,
                message: input,
            })
            .then((response) => {
                console.log(response.data);
                setInput('');
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>user's name</h3>
                    <p>Last seen at ...</p>
                </div>
                {/* <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div> */}
            </div>
            <div className="chat_body">
                {messages && (
                    messages.map((message) => (
                        <p className="chat_message">
                            <span className="chat_name">{message.name}</span>
                            {message.message}
                            <span className="chat_timestamp">{message.createdAt}</span>
                        </p>
                    ))
                )}
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="message" type="text" />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
