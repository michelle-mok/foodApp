import React from 'react'
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import './Locate.css';

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
        <button className="locate" onClick={handleClick}>
            <ExploreOutlinedIcon />
        </button>
    )
}

export default Locate
