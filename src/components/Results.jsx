import React, { useState, useContext, useEffect } from 'react';
import { foodAppContext, getSuggestedPeople } from '../store';
import './Results.css';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import { PersonOutline } from '@material-ui/icons';

function Results() {
    const { store, dispatch } = useContext(foodAppContext);
    const { results, friends } = store;
    console.log('results', results);
    const [suggestedPeople, setSuggestedPeople] = useState([]);

    useEffect(() => {
        if (friends === null) {
            getSuggestedPeople(setSuggestedPeople);
        }
    }, []);

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
                {results.map((result) => {
                    return (
                        <>
                            <div className="result-details">
                                <div className="result-photo">
                                    <img src={result.photoUrl} />
                                </div>
                                <div className="result-bottom">
                                    {friends && (
                                        <div className="result-button">
                                            <ChatOutlinedIcon />
                                            <ArrowForwardSharpIcon />
                                        </div>
                                    )}
                                    <div className="result-text">
                                        {result.name}
                                        <br></br>
                                        {result.address}
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
