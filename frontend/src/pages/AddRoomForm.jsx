import React, { useState } from 'react';
import axios from 'axios';

function AddRoomForm() {
    const [roomName, setRoomName] = useState('');
    const [buildingId, setBuildingId] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('adminToken'); // Admin token for authentication

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:5003/api/rooms',
                { name: roomName, building_id: buildingId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(res.data.message);
            setRoomName('');
            setBuildingId('');
        } catch (err) {
            setMessage(err.response?.data?.error || "Failed to add room.");
        }
    };

    return (
        <div>
            <h2>Add a New Room</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Room Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Building ID"
                    value={buildingId}
                    onChange={(e) => setBuildingId(e.target.value)}
                />
                <button type="submit">Add Room</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddRoomForm;
