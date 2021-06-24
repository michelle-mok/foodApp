import React, { useState, useContext, useEffect } from 'react';
import { foodAppContext, getSuggestedPeople, setupChatRoom } from '../store';
import './Results.css';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function Results() {
    const { store, dispatch } = useContext(foodAppContext);
    const { results, friends, userInfo } = store;
    const [suggestedPeople, setSuggestedPeople] = useState([]);
    let history = useHistory();
    console.log('results', results);
    console.log('friends', friends);

    useEffect(() => {
        if (friends === null) {
            getSuggestedPeople(setSuggestedPeople);
        }
    }, []);

    const handleClick = () => {
        const ids = [];
        friends.forEach((friend) => {
            ids.push(friend.id);
        })

        ids.push(userInfo.id);
        const roomName = ids.sort().join('');
        console.log(roomName);
        setupChatRoom(ids, roomName, history, dispatch);
    }

    const handleSuggestedPersonClick = (id) => {
        console.log('person id', id);
        const ids = [];
        ids.push(id);
        ids.push(userInfo.id);
        const roomName = ids.sort().join('');
        setupChatRoom(ids, roomName, history, dispatch);
    }

    console.log('results', results);
    return (
        <div className="results">
            <div className="results-header">
                <div className="results-header-icon">
                    <SentimentVerySatisfiedIcon />
                </div>
                <div className="results-header-text">
                    <h2>Ta daa !!!</h2>
                    <p> Here are your results</p>
                </div>
            </div>
            <div className="results-body">
                {results.map((result, index) => {
                    return (
                        <>
                            <div key={index} className="result-details">
                                <div className="result-photo">
                                    <img src={result.photoUrl} />
                                </div>
                                <div className="result-bottom">
                                    {friends && (
                                        <div className="result-button" onClick={handleClick}>
                                            <ChatOutlinedIcon />
                                        </div>
                                    )}
                                    <div className="result-text">
                                        {result.name}
                                        <br></br>
                                        {result.address}
                                        <br></br>
                                        {result.websiteUrl}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
                {friends === null && (
                    <div className="suggested-people">
                        <div className="suggested-people-header">
                            Suggested People
                        </div>
                        {suggestedPeople && (
                            <div className="suggested-person">
                                {suggestedPeople.map((person) => {
                                    return (
                                        <div className="suggested-person-details">
                                            <div className="suggested-person-pic">
                                                <img src={person.profilePic} />
                                            </div>
                                            <h3>{person.username}</h3>
                                            <button className="suggested-person-button" onClick={() => handleSuggestedPersonClick(person.id)}>
                                                <ChatOutlinedIcon />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="results-suggestions">

            </div>
        </div>
    )
}

export default Results
