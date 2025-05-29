import React, { useState, useEffect } from 'react';
import API from '../services/api';

const LocationForm = ({ selectedCoords, onAdd, onDelete, locations, onLocate }) => {
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        if (selectedCoords) {
            setLatitude(selectedCoords.latitude);
            setLongitude(selectedCoords.longitude);
        }
    }, [selectedCoords]);

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    alert("Failed to get location: " + error.message);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/locations', { name, latitude, longitude });
            onAdd(); // refresh location list in parent
            setName('');
            setLatitude('');
            setLongitude('');
        } catch (err) {
            console.error('Failed to save location', err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Add Location</h3>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Location Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                        required
                    />
                </div>

                <div className="location-buttons">
                    <button type="button" onClick={handleUseCurrentLocation}>
                        Use Current Location
                    </button>
                    <button type="submit">Save</button>
                </div>
            </form>

            <div className="saved-locations">
                <h4>Saved Locations</h4>
                {locations.length === 0 ? (
                    <p>No saved locations yet.</p>
                ) : (
                    <ul>
                        {locations.map((loc, idx) => (
                            <li key={idx} style={{marginBottom: '10px'}}>
                                <span><strong>{loc.name || 'Unnamed'}</strong>: ({loc.latitude}, {loc.longitude})</span>
                                <div style={{display: 'flex', gap: '8px', marginTop: '5px'}}>
                                    <button
                                        className="locate-button"
                                        onClick={() => onLocate({lat: loc.latitude, lng: loc.longitude})}
                                    >
                                        Locate
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => onDelete(loc._id || loc.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>

                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default LocationForm;
