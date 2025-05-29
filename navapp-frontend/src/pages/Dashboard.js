import React, { useEffect, useState } from 'react';
import API from '../services/api';
import LocationForm from '../components/LocationForm';
import MapView from '../components/MapView';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css'


const Dashboard = () => {
    const [locations, setLocations] = useState([]);
    const [selectedCoords, setSelectedCoords] = useState(null);
    const [centerCoords, setCenterCoords] = useState(null);

    const handleLocate = (coords) => {
        setCenterCoords(coords); // Triggers map to pan
    };


    const handleDelete = async (id) => {
        try {
            await API.delete(`/locations/${id}`);
            fetchLocations(); // Refresh the list
        } catch (err) {
            console.error('Failed to delete location', err);
        }
    };


    const fetchLocations = async () => {
        try {
            const res = await API.get('/locations');
            setLocations(res.data);
        } catch (err) {
            console.error("Failed to fetch locations", err);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleMapClick = ({ lat, lng }) => {
        console.log('Selected Coordinates:', lat, lng);
        setSelectedCoords({ latitude: lat, longitude: lng });
    };

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <div className="form-section">
                    <LocationForm
                        selectedCoords={selectedCoords}
                        onAdd={fetchLocations}
                        onDelete={handleDelete}
                        locations={locations}
                        onLocate={handleLocate}
                    />
                </div>
                <div className="map-section">
                    <MapView
                        locations={locations}
                        onMapClick={handleMapClick}
                        centerCoords={centerCoords}
                    />
                </div>
            </div>
        </>
    );

};

export default Dashboard;
