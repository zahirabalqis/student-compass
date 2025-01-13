import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import UserPortal from './pages/UserPortal';
import AdminPortal from './pages/AdminPortal';
import AdminLogin from './components/AdminLogin';
import fyplogo from './assets/fyplogo.png'; // Path to your logo
import './App.css'; // Import your CSS file

function App() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    // Check if the admin token exists on page load
    useEffect(() => {
        const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
        setIsAdminLoggedIn(!!token); // Set login status based on token existence
    }, []);

    // Function to handle admin login status
    const handleLogin = (status) => {
        setIsAdminLoggedIn(status);
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminToken');
        setIsAdminLoggedIn(false);
    };

    return (
        
        <Router>
            <div>
                
                <br></br><br></br><br></br>
                {/* Logo */}
                <div style={{ textAlign: 'center', margin: '20px 10' }}>
                    <img src={fyplogo} alt="fyplogo" style={{ height: '160px' }} />
                </div>

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/user" element={<UserPortal />} />
                    <Route
                        path="/admin/login"
                        element={<AdminLogin onLogin={handleLogin} />}
                    />
                    <Route
                        path="/admin"
                        element={isAdminLoggedIn ? <AdminPortal /> : <Navigate to="/admin/login" />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

/* Home Component for Main Page */
function Home() {
    return (
        <div className="app-background">
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
  <h1 style={{ color: 'white' }}>Welcome to the Student Compass</h1>
  <h3 style={{ color: 'white' }}>Direction for Students Journey</h3>
  </div>
    </div>
<br></br>
            <br />
            <Link to="/user">
                <button style={{ padding: '10px 20px', margin: '10px' }}>Student Portal</button>
            </Link>
            <Link to="/admin/login">
                <button style={{ padding: '10px 20px', margin: '10px' }}>Admin Portal</button>
            </Link>
        </div>
    );
}

/* NotFound Component for unmatched routes */
function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for does not exist.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
}

export default App;
