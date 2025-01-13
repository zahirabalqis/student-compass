import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

const MapView = ({ buildings }) => {
  const [directions, setDirections] = useState(null);
  const [steps, setSteps] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [origin, setOrigin] = useState(null);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    
  };

  const defaultCenter = {
    lat: buildings.length > 0 ? buildings[0].latitude : 3.6853,
    lng: buildings.length > 0 ? buildings[0].longitude : 101.5235,
  };

  const calculateDirections = () => {
    if (!origin || !selectedBuilding) {
      alert("Please select both starting and destination locations.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: origin.latitude, lng: origin.longitude },
        destination: {
          lat: selectedBuilding.latitude,
          lng: selectedBuilding.longitude,
        },
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);

          const stepsArray = result.routes[0].legs[0].steps.map((step) => ({
            distance: step.distance.text,
            duration: step.duration.text,
            instructions: step.instructions,
          }));
          setSteps(stepsArray);
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBuec7RULi4zmqttUk69dhUBZRH6Xkw1rk">
      <div>
        {/* Dropdowns and Get Directions Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ marginRight: "10px" }}>
            <label>Starting Location:</label>
            <select
              onChange={(e) => {
                const building = buildings.find(
                  (b) => b.name === e.target.value
                );
                setOrigin(building);
              }}
              defaultValue=""
              style={{ marginLeft: "10px" }}
            >
              <option value="" disabled>
                Select a location
              </option>
              {buildings.map((building) => (
                <option key={building.id} value={building.name}>
                  {building.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginRight: "10px" }}>
            <label>Destination Location:</label>
            <select
              onChange={(e) => {
                const building = buildings.find(
                  (b) => b.name === e.target.value
                );
                setSelectedBuilding(building);
              }}
              defaultValue=""
              style={{ marginLeft: "10px" }}
            >
              <option value="" disabled>
                Select a location
              </option>
              {buildings.map((building) => (
                <option key={building.id} value={building.name}>
                  {building.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={calculateDirections}
            style={{ padding: "5px 10px" }}
          >
            Get Directions
          </button>
        </div>

        <div style={{ display: "flex" }}>
          {/* Map Section */}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={17}
          >
            {buildings.map((building) => (
              <Marker
                key={building.id}
                position={{ lat: building.latitude, lng: building.longitude }}
              />
            ))}

            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>

          {/* Walking Steps Section */}
          <div
            style={{
              marginLeft: "20px",
              maxWidth: "300px",
              overflowY: "auto",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              color: "white",
            }}
          >
            {steps.length > 0 && (
              <div>
                <h4>Walking Steps:</h4>
                <ol style={{ paddingLeft: "15px" }}>
                  {steps.map((step, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                      <div
                        dangerouslySetInnerHTML={{ __html: step.instructions }}
                        style={{ fontWeight: "bold" }}
                      ></div>
                      <div>Distance: {step.distance}</div>
                      <div>Duration: {step.duration}</div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default MapView;
