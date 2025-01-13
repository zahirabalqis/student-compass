import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../AdminPortal.css'; // Add custom styles if needed
import 'bootstrap/dist/css/bootstrap.min.css'; // Use Bootstrap for styling

function AdminPortal() {
    const [buildings, setBuildings] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState('');
    const [editBuilding, setEditBuilding] = useState(null);
    const [editContact, setEditContact] = useState(null);
    const [newBuilding, setNewBuilding] = useState({ name: '', longitude: '', latitude: '' });
    const [newContact, setNewContact] = useState({ name: '', email: '', contact_number: '' });

    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
        } else {
            fetchData();
        }
    }, [token, navigate]);

    const fetchData = async () => {
        try {
            const buildingsRes = await axios.get('${import.meta.env.VITE_API_BASE_URL}/api/buildings', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBuildings(buildingsRes.data);

            const contactsRes = await axios.get('${import.meta.env.VITE_API_BASE_URL}/api/contacts', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setContacts(contactsRes.data);
        } catch (err) {
            setError('Failed to fetch data.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const handleDeleteBuilding = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/buildings/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBuildings(buildings.filter((building) => building.id !== id));
        } catch (err) {
            setError('Failed to delete building.');
        }
    };

    const handleDeleteContact = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/contacts/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setContacts(contacts.filter((contact) => contact.id !== id));
        } catch (err) {
            setError('Failed to delete contact.');
        }
    };

    const handleUpdateBuilding = async () => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/buildings/${editBuilding.id}`,
                editBuilding,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setEditBuilding(null);
            fetchData();
        } catch (err) {
            setError('Failed to update building.');
        }
    };

    const handleUpdateContact = async () => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/contacts/${editContact.id}`,
                editContact,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setEditContact(null);
            fetchData();
        } catch (err) {
            setError('Failed to update contact.');
        }
    };

    return (
        <div>
            <header className="d-flex align-items-center justify-content-between px-3 py-2 bg-dark text-white fixed-top">
                <div className="header-logo">
                    <img src="/src/assets/fyplogo.png" alt="Logo" style={{ height: '50px' }} />
                </div>
                <div className="header-title text-center flex-grow-1">
                    <h3>Student Compass</h3>
                </div>
                <div className="header-logout">
                    <button onClick={handleLogout} className="btn btn-outline-light">
                        Logout
                    </button>
                </div>
            </header>

            <div className="container mt-5 pt-5">
                <h1 className="mb-4"><b>Admin Portal</b></h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Buildings Section */}
                <h3>Buildings</h3>
                <table className="table table-bordered table-striped mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buildings.map((building) => (
                            <tr key={building.id}>
                                <td>{building.id}</td>
                                <td>
                                    {editBuilding && editBuilding.id === building.id ? (
                                        <input
                                            type="text"
                                            value={editBuilding.name}
                                            onChange={(e) =>
                                                setEditBuilding({ ...editBuilding, name: e.target.value })
                                            }
                                        />
                                    ) : (
                                        building.name
                                    )}
                                </td>
                                <td>{building.longitude}</td>
                                <td>{building.latitude}</td>
                                <td>
                                    {editBuilding && editBuilding.id === building.id ? (
                                        <>
                                            <button
                                                onClick={handleUpdateBuilding}
                                                className="btn btn-sm btn-success me-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditBuilding(null)}
                                                className="btn btn-sm btn-secondary"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setEditBuilding(building)}
                                                className="btn btn-sm btn-warning me-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBuilding(building.id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Contacts Section */}
                <h3>Contacts</h3>
                <table className="table table-bordered table-striped mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.id}</td>
                                <td>
                                    {editContact && editContact.id === contact.id ? (
                                        <input
                                            type="text"
                                            value={editContact.name}
                                            onChange={(e) =>
                                                setEditContact({ ...editContact, name: e.target.value })
                                            }
                                        />
                                    ) : (
                                        contact.name
                                    )}
                                </td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    {editContact && editContact.id === contact.id ? (
                                        <>
                                            <button
                                                onClick={handleUpdateContact}
                                                className="btn btn-sm btn-success me-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditContact(null)}
                                                className="btn btn-sm btn-secondary"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setEditContact(contact)}
                                                className="btn btn-sm btn-warning me-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteContact(contact.id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer>
        <p>&copy; 2025 Student Compass. All rights reserved.</p>
      </footer>
        </div>
    );
}

export default AdminPortal;
