import React, { useRef, useState, useContext, useEffect } from 'react';
import './Chat.css';
import { Avatar } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import axios from 'axios';
import Pusher from 'pusher-js';
import SendIcon from '@material-ui/icons/Send';
import { foodAppContext, getChatRoom, getOneUser, postMessage } from '../store.js';
import Picker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';

function Chat() {
    const [input, setInput] = useState('');
    const { dispatch, store } = useContext(foodAppContext);
    const { userInfo, friends, chatroom } = store;
    const [chatRoom, setChatRoom] = useState();
    const [messages, setMessages] = useState();
    const [showEmojis, setShowEmojis] = useState();
    const [cursorPosition, setCursorPosition] = useState();
    const inputRef = useRef();
    const { id } = useParams();

    useEffect(() => {
        if (chatroom !== null && userInfo !== null) {
            getChatRoom(chatroom, setChatRoom, setMessages);
        } else {
            // if (friends) {
            //     const friendIds = [];
            //     friends.forEach((friend) => {
            //         friendIds.push(friend.id);
            //     })
            //     friendIds.push(userInfo.id);
            //     getChatRoom(friendIds, setChatRoom, setMessages);
            // }
            getOneUser(dispatch);
            getChatRoom(id, setChatRoom, setMessages);
        }
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

    useEffect(() => {
        inputRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    const handleShowEmojis = () => {
        setShowEmojis(!showEmojis);
    }

    const onEmojiClick = (e, { emoji }) => {
        const ref = inputRef.current;
        ref.focus();
        console.log(ref);
        const start = input.substring(0, ref.selectionStart);
        console.log(start);
        const end = input.substring(ref.selectionStart);
        console.log(end);
        const msg = start + emoji + end;
        setInput(msg);
        inputRef.current.selectionEnd = start.length + emoji.length;
        setCursorPosition(start.length + emoji.length);
    }

    const sendMessage = (event) => {
        event.preventDefault();
        console.log('chat room', chatRoom);
        console.log('messages', messages);
        // const BACKEND_URL = 'http://localhost:3004';
        // axios
        //     .post(BACKEND_URL + '/newMessage', {
        //         roomId: chatRoom.id,
        //         userName: userInfo.username,
        //         message: input,
        //     })
        //     .then((response) => {
        //         console.log(response.data);
        //         setInput('');
        //     })
        //     .catch((error) => console.log(error));
        postMessage(chatRoom, userInfo, input, setInput);
    }
    console.log('chatroom details', chatRoom);
    console.log('chatroom', chatroom);
    console.log('message', messages);
    console.log('userInfo', userInfo);

    return (

        <div className="chat">
            {chatRoom && messages && (

                <div className="chat_header">
                    <Avatar src={chatRoom.profilepic} />
                    <div className="chat_headerInfo">
                        <h3>{chatRoom.displayName}</h3>
                        {/* <p>Last seen at {messages[messages.length - 1].createdAt}</p> */}
                    </div>
                </div>
            )}
            <div className="chat_body">
                {messages && userInfo && (
                    messages.map((message) => (
                        // message.userId === userInfo.id ? (

                        <div className={message.userId === userInfo.id ? "chat-message-user" : "chat-message-friend"}>
                            <div className="chat-message-top">
                                {message.userId !== userInfo.id && chatRoom.numUsers > 1 && (
                                    <p className="chat_name">{message.userName}</p>
                                )}
                            </div>
                            <div className="chat-message-bottom">
                                <p className="chat-message-text">{message.message}</p>
                                <p className="chat_timestamp">{message.createdAt}</p>
                            </div>
                        </div>

                        // ) : (
                        //     <div className="chat-message-friend">
                        //         <div className="chat-message-top">
                        //             <p className="chat_name">{message.username}</p>
                        //         </div>
                        //         <div className="chat-message-bottom">
                        //             <p className="chat-message-text">{message.message}</p>
                        //             <p className="chat_timestamp">{message.createdAt}</p>
                        //         </div>
                        //     </div>
                        // )
                    ))
                )}
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon onClick={handleShowEmojis} />
                <form>
                    <input value={input} ref={inputRef} onChange={(e) => setInput(e.target.value)} placeholder="message" type="text" />
                </form>
                <button className="send-icon" onClick={sendMessage} type="submit">
                    <SendIcon />
                </button>
            </div>
            {showEmojis && (
                <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }} />
            )}
        </div>


    )
}

export default Chat
