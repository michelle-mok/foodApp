import React, { useState, useRef, useCallback, useContext } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Search from './Search.jsx';
import Locate from './Locate.jsx';
import './Location.css';
import { getResults, foodAppContext } from '../store';
import { useHistory } from 'react-router-dom';
import mapStyles from '../mapStyles';

const libraries = ['places'];

const mapContainerStyle = {
    width: "400px",
    height: "700px",
};
const center = {
    lat: 1.364917,
    lng: 103.822872
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}

function Location() {
    const google = window.google
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { store, dispatch } = useContext(foodAppContext);
    const { budget, everyonesCuisines } = store;
    let history = useHistory();
    let queries;
    console.log('budget from store', budget);

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
        setShowModal(true);
        console.log('shared cuisines from store', everyonesCuisines);
        if (everyonesCuisines.length > 1) {
            queries = everyonesCuisines.join(' | ');
            console.log('queries string----', queries);
        } else {
            queries = everyonesCuisines[0];
        }
        console.log('queries', queries);

        const userLocation = new google.maps.LatLng(markers[0].lat, markers[0].lng);
        console.log(' user location', userLocation);
        const placesRequest = {
            location: userLocation,
            radius: 5 * 1000,
            type: ['food'],
            query: `${queries}`,
            maxPriceLevel: budget,
            // openNow: true,
        }

        placesServiceRef.current.textSearch(placesRequest, ((response, status) => {
            console.log(response);
            const filteredResult = [];
            let counter = 0;
            response.forEach((foodOutlet) => {
                if (foodOutlet.rating > 4 && foodOutlet.business_status === "OPERATIONAL" && counter < 3) {
                    const { name } = foodOutlet;
                    const address = foodOutlet.formatted_address;
                    let photoUrl;
                    if (foodOutlet.photos && foodOutlet.photos.length > 0) {
                        photoUrl = foodOutlet.photos[0].getUrl();
                    } else {
                        photoUrl = null;
                    }

                    let websiteUrl;
                    const websiteRequest = {
                        placeId: foodOutlet.place_id,
                        fields: ['website']
                    }
                    placesServiceRef.current.getDetails(websiteRequest, (result, status) => {
                        console.log('url search result', result);
                        websiteUrl = result.website;
                        console.log('website url', websiteUrl);
                        console.log('filtered result inside get details');
                        filteredResult.push({ name, address, photoUrl, websiteUrl });
                        if (counter === 3) {
                            getResults(dispatch, filteredResult, history);
                        }
                        console.log('filtered', filteredResult);
                    });
                    counter += 1;
                }
            })
            console.log('status', status);
        }))
    }

    if (loadError) return 'error loading maps';
    if (!isLoaded) return 'loading maps';

    return (
        <div className="location">
            {showModal && (
                <div className="map-modal">
                    <img src="https://media.giphy.com/media/3ov9k0BZQL358k458s/giphy.gif" />
                </div>
            )}
            <Locate panTo={panTo} />
            <Search panTo={panTo} />
            <button type="submit" className="submit-button" onClick={handleSubmit}>Ready!</button>

            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center} options={options} onClick={handleClick} onLoad={(map) => onMapLoad(map)}>
                {markers && (markers.map((marker, index) => {
                    return (
                        <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => { setSelected(marker) }} />
                    )
                }))}
            </GoogleMap>
        </div>
    )
}

export default Location
