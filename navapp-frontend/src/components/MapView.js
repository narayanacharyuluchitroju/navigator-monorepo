import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';

const ClickHandler = ({ onMapClick }) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onMapClick({ lat, lng });
        },
    });
    return null;
};

const CenterMap = ({ centerCoords }) => {
    const map = useMap();

    useEffect(() => {
        if (centerCoords) {
            map.setView([centerCoords.lat, centerCoords.lng], 15); // zoom in to 15
        }
    }, [centerCoords, map]);

    return null;
};

const MapView = ({ locations, onMapClick, centerCoords }) => {
    return (
        <MapContainer center={[39.76, -84.19]} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <ClickHandler onMapClick={onMapClick} />
            <CenterMap centerCoords={centerCoords} />
            {locations.map((loc, index) => (
                <Marker key={index} position={[loc.latitude, loc.longitude]}>
                    <Popup>{loc.name || 'Unnamed'}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;
