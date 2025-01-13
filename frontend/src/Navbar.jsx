import React from 'react';
import './Navbar.css'; // Custom CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          {/* Home */}
          <li className="navbar-item">
            <a href="/" className="navbar-link">Utama</a>
          </li>

          {/* Info Dropdown */}
          <li className="navbar-item dropdown">
            <a href="#" className="navbar-link">
              Info <span className="dropdown-icon">▼</span>
            </a>
            <ul className="dropdown-menu">
              <li><a href="/tentang-upsi" className="dropdown-link">Tentang UPSI</a></li>
              <li><a href="/canselor" className="dropdown-link">Canselor</a></li>
              <li><a href="/pro-canselor" className="dropdown-link">Pro Canselor</a></li>
              <li><a href="/ahli-lembaga" className="dropdown-link">Ahli Lembaga Pengarah</a></li>
              <li><a href="/naib-canselor" className="dropdown-link">Naib Canselor</a></li>
              <li><a href="/tim-naib-canselor" className="dropdown-link">Timbalan Naib Canselor</a></li>
              <li><a href="/pengurusan" className="dropdown-link">Pengurusan Tertinggi</a></li>
            </ul>
          </li>

          {/* Add more menu items as needed */}
          <li className="navbar-item">
            <a href="/fakulti" className="navbar-link">Fakulti</a>
          </li>
          <li className="navbar-item">
            <a href="/pelajar" className="navbar-link">Pelajar</a>
          </li>
          <li className="navbar-item">
            <a href="/alumni" className="navbar-link">Alumni</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
