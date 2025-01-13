import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import MapView from '../pages/MapView';
import Facilities from '../facilities';
import '../App.css';
import logo from '../assets/fyplogo.png';
import busImage1 from '../assets/bus_time1.jpg';
import busImage2 from '../assets/bus_time2.jpg';
import busImage3 from "../assets/bus_time3.jpg";
import Feedback from "../Feedback";

function UserPortal() {
  const [buildings, setBuildings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roomsByBuilding, setRoomsByBuilding] = useState({});
  const [visibleRooms, setVisibleRooms] = useState({});
  const [currentView, setCurrentView] = useState('buildings');
  const [contacts, setContacts] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const busImages = [busImage1, busImage2, busImage3];

  useEffect(() => {
    axios
      .get('http://localhost:5003/api/buildings')
      .then((res) => {
        setBuildings(res.data);
      })
      .catch((err) => {
        console.error('Error fetching buildings:', err);
      });
  }, []);

  useEffect(() => {
    if (currentView === 'contacts') {
      axios
        .get('http://localhost:5003/api/contacts')
        .then((res) => {
          setContacts(res.data);
        })
        .catch((err) => {
          console.error('Error fetching contacts:', err);
        });
    }
  }, [currentView]);

  useEffect(() => {
    if (currentView === 'busTime') {
      const interval = setInterval(() => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % busImages.length);
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(interval);
    }
  }, [currentView]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectBuilding = (buildingId) => {
    if (visibleRooms[buildingId]) {
      setVisibleRooms((prevState) => ({
        ...prevState,
        [buildingId]: false,
      }));
      return;
    }

    axios
      .get(`http://localhost:5003/api/rooms/${buildingId}`)
      .then((res) => {
        setRoomsByBuilding((prevState) => ({
          ...prevState,
          [buildingId]: res.data,
        }));
        setVisibleRooms((prevState) => ({
          ...prevState,
          [buildingId]: true,
        }));
      })
      .catch((err) => {
        console.error('Error fetching rooms:', err);
      });
  };

  const filteredBuildings = buildings
    .filter((building) =>
      building.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleGetDirections = (building) => {
    setSelectedBuilding(building);
  };

  return (
    <div id="root">
      <header className="header">
        <div className="logo-container">
        <img src="/src/assets/fyplogo.png" alt="Logo" style={{ height: '50px' }} />
        </div>
        <div className="header-title text-left flex-grow-1">
                    <h5>Student Compass</h5>
                </div>
        <nav>
          <a onClick={() => setCurrentView('buildings')} href="#">
            Buildings
          </a>
          <a onClick={() => setCurrentView('facilities')} href="#">
            Facilities
          </a>
          <a onClick={() => setCurrentView('busTime')} href="#">
            Bus Schedule
          </a>
          <a onClick={() => setCurrentView('contacts')} href="#">
            Contact Information
          </a>
          <a onClick={() => setCurrentView('feedback')} href="#">
    Feedback
  </a>
        </nav>
        <div className="home-icon">
          <a href="/">
            <FaHome size={40} style={{ color: 'black' }} title="Go to Home" />
          </a>
        </div>
      </header>

      <main>
        {currentView === 'buildings' && (
          <>
            <h1><b> Kampus Sultan Abdul Jalil Shah (KSAJS) </b></h1>
            <br></br>
            <MapView buildings={filteredBuildings} selectedBuilding={selectedBuilding} />
            <br />
            <div>
              <input
                type="text"
                placeholder="Search buildings..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-box"
              />
            </div>
            <h2><b>Building List</b></h2>
            <br></br>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Building Name</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rooms</th>
                  
                </tr>
              </thead>
              <tbody>
                {filteredBuildings.map((building) => (
                  <tr key={building.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{building.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      <button onClick={() => handleSelectBuilding(building.id)}>
                        {visibleRooms[building.id] ? 'Hide Rooms' : 'View Rooms'}
                      </button>
                      {visibleRooms[building.id] && (
                        <ul style={{ marginTop: '5px', padding: 0, listStyleType: 'none' }}>
                          {roomsByBuilding[building.id]?.map((room) => (
                            <li key={room.id}>{room.name}</li>
                          ))}
                        </ul>
                      )}
                    </td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {currentView === 'contacts' && (
          <div>
            <h2><b>Contact Information</b></h2>
            <br></br>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{contact.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{contact.email}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{contact.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentView === 'busTime' && (
          <div>
            <h1><b>Bus Schedule</b></h1>
            <br />
            <div className="slideshow">
              <img
                src={busImages[slideIndex]}
                alt={`Bus Time ${slideIndex + 1}`}
                style={{ maxWidth: '400px', height: 'auto' }}
              />
            </div>
          </div>
        )}

        {currentView === 'facilities' && <Facilities />}
        {currentView === 'feedback' && <Feedback />}
      </main>
      <br />
      <footer>
        <p>&copy; 2025 Student Compass. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default UserPortal;
