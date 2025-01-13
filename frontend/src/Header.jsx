import React from 'react';
import './Header.css';

const Header = ({ onNavigate }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h3>Welcome to Student Compass</h3>
        <p>Direction for Students Journey</p>
        <div className="nav-buttons">
          <button onClick={() => onNavigate('buildings')}>BUILDINGS</button>
          <button onClick={() => onNavigate('contacts')}>CONTACT INFORMATION</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
