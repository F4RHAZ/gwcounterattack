import React, { useState } from 'react';
import './style.css'


function Timecalc() {

    const [distance, setDistance] = useState('');
    const [selectedTroop, setSelectedTroop] = useState('Interceptor');
    const [travelTimeHours, setTravelTimeHours] = useState('0');
    const [travelTimeMinutes, setTravelTimeMinutes] = useState('');
    const [travelTimeSeconds, setTravelTimeSeconds] = useState('');
    const [hyperspaceTimeHours, setHyperspaceTimeHours] = useState('0');
    const [hyperspaceTimeMinutes, setHyperspaceTimeMinutes] = useState('0');
    const [hyperspaceTimeSeconds, setHyperspaceTimeSeconds] = useState('0');
    const [impulseBoost, setImpulseBoost] = useState('80');
    const [timeTaken, setTimeTaken] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
  
    const troopSpeeds = {
      'Interceptor': 12000,
      'Destroyer': 8000,
      'Cruiser': 7000,
      'Battleship': 8000,
      'Bomber' : 5000,
      'Colony' : 4000
    };
  
    const handleTroopChange = (e) => {
      setSelectedTroop(e.target.value);
    };
  
    const calculateTimeTaken = () => {
      // Convert travel time inputs to seconds
      const travelTimeInSeconds = (parseInt(travelTimeHours) * 3600) + (parseInt(travelTimeMinutes) * 60) + parseInt(travelTimeSeconds);
  
      // Convert hyperspace time inputs to seconds
      const hyperspaceTimeInSeconds = (parseInt(hyperspaceTimeHours) * 3600) + (parseInt(hyperspaceTimeMinutes) * 60) + parseInt(hyperspaceTimeSeconds);
  
      // Get selected troop's speed
      const troopSpeed = troopSpeeds[selectedTroop];
  
      // Calculate regular travel time
      const regularTravelTime = (parseInt(distance) / troopSpeed) * 3600; // Convert hours to seconds
  
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
    };
  
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.round(seconds % 60); 
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    };
  
  return (
    <div className="card">
    <h2>Travel Time Calculator</h2>
    <div className="input-container">
      <div className="label-container">
        <label>Distance (km):</label>
        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
      </div>
      <div className="label-container">
        <label>Troop:</label>
        <select value={selectedTroop} onChange={handleTroopChange}>
          <option value="Interceptor">Interceptor</option>
          <option value="Destroyer">Destroyer</option>
          <option value="Cruiser">Cruiser</option>
          <option value="Bomber">Bomber</option>
          <option value="Battleship">Battleship</option>
          <option value="Colony">Colony</option>
        </select>
      </div>
      <div className="label-container">
        <label>Travel Time:</label>
        <input type="number" className='time' value={travelTimeHours} onChange={(e) => setTravelTimeHours(e.target.value)} /> hours
        <input type="number" className='time' value={travelTimeMinutes} onChange={(e) => setTravelTimeMinutes(e.target.value)} /> minutes
        <input type="number" className='time' value={travelTimeSeconds} onChange={(e) => setTravelTimeSeconds(e.target.value)} /> seconds
      </div>
      <div className="label-container">
        <label>Hyperspace Time:</label>
        <input type="number" className='time' value={hyperspaceTimeHours} onChange={(e) => setHyperspaceTimeHours(e.target.value)} /> hours
        <input type="number" className='time' value={hyperspaceTimeMinutes} onChange={(e) => setHyperspaceTimeMinutes(e.target.value)} /> minutes
        <input type="number" className='time' value={hyperspaceTimeSeconds} onChange={(e) => setHyperspaceTimeSeconds(e.target.value)} /> seconds
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
  )
}

export default Timecalc
