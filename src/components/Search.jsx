import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
import './Search.css';

function Search({ panTo }) {
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestion, } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 1.364917, lng: () => 103.822872 },
            radius: 5 * 1000,
        }
    })

    const handleSelect = async (address) => {
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
                    {status === "OK" && data.map(({ id, description }) => (
                        <ComboboxOption key={id} value={description} />
                    ))}
                </ComboboxPopover>
            </Combobox>

        </div>
    )
}

export default Search
