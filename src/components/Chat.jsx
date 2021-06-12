import React from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

function Chat() {
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>room name</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                <p className="chat_message">
                    <span className="chat_name">Katie</span>
                     i am a message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message chat_receiver">
                    <span className="chat_name">Katie</span>
                     i am a message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input placeholder="message" type="text" />
                    <button type="submit">Send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
