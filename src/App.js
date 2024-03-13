import React, { useState } from 'react';
import './App.css';
import Timecalc from './components/Timecalc';
import Shipcalc from './components/Shipcalc';


const App = () => {
  const [activeTab, setActiveTab] = useState(1);


  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        <button className={activeTab === 1 ? "active" : ""} onClick={() => handleTabChange(1)}>Travel Time Calculator</button>
        <button className={activeTab === 2 ? "active" : ""} onClick={() => handleTabChange(2)}>Troop Calculator</button>
      </div>
      <div className="tab-content">
        {activeTab === 1 && (
          <Timecalc />
        )}
        {activeTab === 2 && (
          <div className="card hello">
            <Shipcalc/>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
