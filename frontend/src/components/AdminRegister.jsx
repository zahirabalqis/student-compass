import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import '../AdminRegister.css'; // Add your custom CSS if needed

function AdminRegister() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const res = await axios.post('${import.meta.env.VITE_API_BASE_URL}/api/admin/register', {
                username,
                password,
            });

            setSuccess(res.data.message);
            setError('');
            // Redirect to Admin Login
            setTimeout(() => navigate('/admin/login'), 2000);
        } catch (err) {
            console.error('Registration Error:', err);
            setError(err.response?.data?.error || 'Failed to register admin.');
        }
    };

    return (
        <div className="admin-register-container">
            <center><h1>Register New Admin</h1></center>
            <form onSubmit={handleRegister} className="admin-register-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="admin-register-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="admin-register-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="admin-register-input"
                    required
                />
                <button type="submit" className="admin-register-button">Register</button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
        </div>
    );
}

export default AdminRegister;
