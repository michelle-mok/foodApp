// /* global google */

import React, { useState, useRef, useCallback } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import '@reach/combobox/styles.css';
import Search from './Search.jsx';
import Locate from './Locate.jsx';
import './Location.css';

const libraries = ['places'];

const mapContainerStyle = {
    width: "400px",
    height: "700px",
};
const center = {
    lat: 1.364917,
    lng: 103.822872
};

function Location() {
    const google = window.google
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    const handleClick = useCallback((event) => {
        setMarkers([
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    const mapRef = useRef();
    const placesServiceRef = useRef();

    const onMapLoad = useCallback((map) => {
        console.log('is loaded', isLoaded);
        mapRef.current = map;
        placesServiceRef.current = new google.maps.places.PlacesService(map);

    }, [isLoaded]);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    const handleSubmit = () => {
        const filteredResult = [];
        const userLocation = new google.maps.LatLng(markers[0].lat, markers[0].lng);
        console.log(' user location', userLocation);
        const placesRequest = {
            location: userLocation,
            radius: 5 * 1000,
            type: ['food'],
            query: 'thai',
            maxPriceLevel: 2,
            openNow: true,
        }

        placesServiceRef.current.textSearch(placesRequest, ((response, status) => {

            const filteredResult = []
            response.forEach((foodOutlet) => {
                if (foodOutlet.rating > 4 && foodOutlet.business_status === "OPERATIONAL") {
                    filteredResult.push(foodOutlet);
                }
            })

            console.log('status', status);
            console.log('filtered', filteredResult);
        }))
    }

    if (loadError) return 'error loading maps';
    if (!isLoaded) return 'loading maps';

    return (
        <div className="location">
            <Locate panTo={panTo} />
            <Search panTo={panTo} />
            <button type="submit" className="submit-button" onClick={handleSubmit}>Ready!</button>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center} onClick={handleClick} onLoad={(map) => onMapLoad(map)}>
                {markers && (markers.map((marker) => {
                    return (
                        <Marker key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => { setSelected(marker) }} />
                    )
                }))}
            </GoogleMap>
        </div>
    )
}

export default Location
