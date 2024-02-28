import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [distance, setDistance] = useState('');
  const [maxSpeed, setMaxSpeed] = useState('');
  const [travelTimeHours, setTravelTimeHours] = useState('');
  const [travelTimeMinutes, setTravelTimeMinutes] = useState('');
  const [travelTimeSeconds, setTravelTimeSeconds] = useState('');
  const [hyperspaceTimeHours, setHyperspaceTimeHours] = useState('');
  const [hyperspaceTimeMinutes, setHyperspaceTimeMinutes] = useState('');
  const [hyperspaceTimeSeconds, setHyperspaceTimeSeconds] = useState('');
  const [impulseBoost, setImpulseBoost] = useState('');
  const [timeTaken, setTimeTaken] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');

  const calculateTimeTaken = () => {
    // Convert travel time inputs to seconds
    const travelTimeInSeconds = (parseInt(travelTimeHours) * 3600) + (parseInt(travelTimeMinutes) * 60) + parseInt(travelTimeSeconds);

    // Convert hyperspace time inputs to seconds
    const hyperspaceTimeInSeconds = (parseInt(hyperspaceTimeHours) * 3600) + (parseInt(hyperspaceTimeMinutes) * 60) + parseInt(hyperspaceTimeSeconds);

    // Calculate regular travel time
    const regularTravelTime = (parseInt(distance) / parseInt(maxSpeed)) * 3600; // Convert hours to seconds

    // Calculate reduction due to Impulse Engine boost for travel time
    const travelTimeReduction = travelTimeInSeconds * (parseInt(impulseBoost) / 100);

    // Adjusted travel time after reduction
    const adjustedTravelTime = travelTimeInSeconds - travelTimeReduction;

    // Calculate reduction due to Impulse Engine boost for hyperspace time
    const hyperspaceTimeReduction = hyperspaceTimeInSeconds * (parseInt(impulseBoost) / 100);

    // Adjusted hyperspace time after reduction
    const adjustedHyperspaceTime = hyperspaceTimeInSeconds - hyperspaceTimeReduction;

    // Total time taken (travel time + hyperspace time)
    const totalTimeTaken = adjustedTravelTime + adjustedHyperspaceTime;

    // Set the state for time taken
    setTimeTaken(formatTime(totalTimeTaken));

    // Calculate current time
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString());

    // Calculate arrival time
    const arrival = new Date(now.getTime() + totalTimeTaken * 1000);
    setArrivalTime(arrival.toLocaleTimeString());
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.round(seconds % 60); 
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }

  return (
    <div className="card">
      <h2>Travel Time Calculator</h2>
      <div className="input-container">
        <div className="label-container">
          <label>Distance (km):</label>
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
        </div>
        <div className="label-container">
          <label>Max Speed (km/h):</label>
          <input type="number" value={maxSpeed} onChange={(e) => setMaxSpeed(e.target.value)} />
        </div>
        <div className="label-container">
          <label>Travel Time:</label>
          <input type="number" value={travelTimeHours} onChange={(e) => setTravelTimeHours(e.target.value)} /> hours
          <input type="number" value={travelTimeMinutes} onChange={(e) => setTravelTimeMinutes(e.target.value)} /> minutes
          <input type="number" value={travelTimeSeconds} onChange={(e) => setTravelTimeSeconds(e.target.value)} /> seconds
        </div>
        <div className="label-container">
          <label>Hyperspace Time:</label>
          <input type="number" value={hyperspaceTimeHours} onChange={(e) => setHyperspaceTimeHours(e.target.value)} /> hours
          <input type="number" value={hyperspaceTimeMinutes} onChange={(e) => setHyperspaceTimeMinutes(e.target.value)} /> minutes
          <input type="number" value={hyperspaceTimeSeconds} onChange={(e) => setHyperspaceTimeSeconds(e.target.value)} /> seconds
        </div>
        <div className="label-container">
          <label>Impulse Engine boost (%):</label>
          <input type="number" value={impulseBoost} onChange={(e) => setImpulseBoost(e.target.value)} />
        </div>
      </div>
      <button onClick={calculateTimeTaken}>Calculate Time Taken</button>
      <div className="result">
        <label>Time Taken:</label>
        <span>{timeTaken}</span><br />
        <label>Current Time:</label>
        <span>{currentTime}</span><br />
        <label>Arrival Time:</label>
        <span>{arrivalTime}</span>
      </div>
    </div>
  );
}

export default App;
