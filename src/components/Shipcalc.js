import React, { useState } from "react";

const Shipcalc = () => {
  const [troopQuantities, setTroopQuantities] = useState({
    Interceptor: 0,
    Destroyer: 0,
    Cruiser: 0,
    Bomber: 0,
    Battleship: 0,
    Surveyor: 0,
    HeavyTransport: 0,
    LightTransport: 0,
    // Add more troop types as needed
  });

  const troops = [
    {
      name: "Interceptor",
      attackHP: 80,
      defenseHP: 20,
      speed: 12000,
      cargo: 60,
      construction: "M:240 c:240 G:240",
    },
    {
      name: "Destroyer",
      attackHP: 44,
      defenseHP: 110,
      speed: 8000,
      cargo: 160,
      construction: "M:400 C:440 G:300",
    },
    {
      name: "Cruiser",
      attackHP: 300,
      defenseHP: 450,
      speed: 7000,
      cargo: 520,
      construction: "M:2000 C:1620 G:2720",
    },
    {
      name: "Bomber",
      attackHP: 25,
      defenseHP: 5,
      speed: 5000,
      cargo: 10,
      construction: "M:10000 C:7040 G:7800",
    },
    {
      name: "Battleship",
      attackHP: 1400,
      defenseHP: 1180,
      speed: 8000,
      cargo: 920,
      construction: "M:7300 C:5700 G:9940",
    },
    {
      name: "LightTransport",
      attackHP: 1,
      defenseHP: 5,
      speed: 16000,
      cargo: 900,
      construction: "M:1600 C:1260 G:2400",
    },
    {
      name: "HeavyTransport",
      attackHP: 2,
      defenseHP: 10,
      speed: 20000,
      cargo: 3250,
      construction: "M:4400 C:3270 G:7640",
    },
    {
      name: "Surveyor",
      attackHP: 0,
      defenseHP: 0,
      speed: 22000,
      cargo: 1,
      construction: "M:2000 C:14500 G:12500",
    },
  ];

  const handleTroopQuantityChange = (troop, quantity) => {
    setTroopQuantities({ ...troopQuantities, [troop]: quantity });
  };

  const handleClear = () => {
    setTroopQuantities({
      Interceptor: 0,
      Destroyer: 0,
      Cruiser: 0,
      Bomber: 0,
      Battleship: 0,
      Surveyor: 0,
      HeavyTransport: 0,
      LightTransport: 0,

      // Add more troop types as needed
    });
  };

  const calculateResourcesAndHP = () => {
    let totalMetal = 0;
    let totalCrystal = 0;
    let totalGas = 0;
    let totalAttackHP = 0;
    let totalDefenseHP = 0;

    troops.forEach((troop) => {
      const quantity = troopQuantities[troop.name];
      totalMetal += parseInt(troop.construction.split(" ")[0].split(":")[1]) * quantity;
      totalCrystal += parseInt(troop.construction.split(" ")[1].split(":")[1]) * quantity;
      totalGas += parseInt(troop.construction.split(" ")[2].split(":")[1]) * quantity;
      totalAttackHP += troop.attackHP * quantity;
      totalDefenseHP += troop.defenseHP * quantity;
    });

    return { totalMetal, totalCrystal, totalGas, totalAttackHP, totalDefenseHP };
  };

  const { totalMetal, totalCrystal, totalGas, totalAttackHP, totalDefenseHP } = calculateResourcesAndHP();

  return (
    <div className="troop-info">
      <h3>Troop Information</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Attack HP</th>
            <th>Defense HP</th>
            <th>Speed (km/h)</th>
            <th>Cargo (tons)</th>
            <th>Construction</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {troops.map((troop, index) => (
            <tr key={index}>
              <td>{troop.name}</td>
              <td>{troop.attackHP}</td>
              <td>{troop.defenseHP}</td>
              <td>{troop.speed}</td>
              <td>{troop.cargo}</td>
              <td>{troop.construction}</td>
              <td>
                <input
                  type="number"
                  value={troopQuantities[troop.name]}
                  onChange={(e) => handleTroopQuantityChange(troop.name, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h4>Total Resources and HP</h4>
        <p>Total Metal: {totalMetal}</p>
        <p>Total Crystal: {totalCrystal}</p>
        <p>Total Gas: {totalGas}</p>
        <p>Total Attack HP: {totalAttackHP}</p>
        <p>Total Defense HP: {totalDefenseHP}</p>
      </div>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default Shipcalc;
