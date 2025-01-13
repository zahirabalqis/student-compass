import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../AdminLogin.css'; // Import the CSS file for styling

const AdminLogin = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login and Register
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '', // Only for registration
        rememberMe: false, // Only for login
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                // Check if passwords match
                if (formData.password !== formData.confirmPassword) {
                    setMessage('Passwords do not match!');
                    return;
                }

                // Register request
                const response = await axios.post('`${import.meta.env.VITE_API_BASE_URL}/api/admin/register', {
                    username: formData.username,
                    password: formData.password,
                });
                setMessage(response.data.message || 'Registration successful! You can now log in.');
                setIsRegistering(false); // Switch to login form after successful registration
            } else {
                // Login request
                const response = await axios.post('http://localhost:5003/api/admin/login', {
                    username: formData.username,
                    password: formData.password,
                });
                const token = response.data.token;

                // Save token based on "Remember Me"
                if (formData.rememberMe) {
                    localStorage.setItem('adminToken', token); // Persistent storage
                } else {
                    sessionStorage.setItem('adminToken', token); // Session-only storage
                }

                onLogin(true); // Notify parent component of successful login
                navigate('/admin'); // Redirect to Admin Portal
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>{isRegistering ? 'Admin Register' : 'Admin Login'}</h2>
            <form onSubmit={handleSubmit} style={{ margin: '20px auto', maxWidth: '300px' }}>
                {/* Username Field */}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                
                {/* Password Field */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                
                {/* Confirm Password Field (Only for Register) */}
                {isRegistering && (
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    />
                )}

                {/* Remember Me Checkbox (Only for Login) */}
                {!isRegistering && (
                    <div style={{ marginBottom: '10px', textAlign: 'left' }}>
                        <label>
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                style={{ marginRight: '5px' }}
                            />
                            Remember Me
                        </label>
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
                    {isRegistering ? 'Register' : 'Login'}
                </button>
            </form>

            {/* Error/Success Message */}
            <p style={{ color: 'red' }}>{message}</p>

            {/* Toggle between Login and Register */}
            <p>
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                    onClick={() => {
                        setIsRegistering(!isRegistering);
                        setMessage(''); // Clear any previous messages
                    }}
                    style={{ border: 'none', background: 'none', color: 'pink', cursor: 'pointer' }}
                >
                    {isRegistering ? 'Login here' : 'Register here'}
                </button>
            </p>
        </div>
    );
};

export default AdminLogin;
