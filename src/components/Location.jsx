import React, { useState, useRef, useCallback } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
import Search from './Search.jsx';

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
    const { } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAb-M7gNkcFVm-f5NEytLxmUd-iDHFGm8k',
        libraries,
    });

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    const handleClick = useCallback((event) => {
        setMarkers((current) => [...current,
        {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
        },
        ]);
    }, []);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.detZoom(14);
    }, []);

    return (
        <div>
            <Search panTo={panTo} />
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={11} center={center} onClick={handleClick} onLoad={onMapLoad}>
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
