import React from 'react'
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import './Locate.css';
import { IconButton } from '@material-ui/core';

function Locate({ panTo }) {

    const handleClick = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            })
        },
            () => null
        );
    }

    return (
        <div className="locate" onClick={handleClick}>
            <IconButton>
                <ExploreOutlinedIcon />
            </IconButton>
        </div>
    )
}

export default Locate
