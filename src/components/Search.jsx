import React, { useState, useRef, useCallback } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import './Search.css';

function Search({ panTo }) {
    const { ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 1.364917, lng: () => 103.822872 },
            radius: 20 * 1000,
        }
    })

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            console.log(results);
            const { lat, lng } = await getLatLng(results[0]);
            console.log({ lat, lng });
            panTo({ lat, lng });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput value={value} onChange={(e) => { setValue(e.target.value); }} disabled={!ready} placeholder="enter an address" />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({ id, description }) => (
                            <ComboboxOption key={id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>

        </div>
    )
}

export default Search
