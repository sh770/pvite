// import React from "react";
import "./App.css";
import FlightsComponent from "./components/FlightsComponent";
import FlightsComponent6 from "./components/FlightsComponent6";


function App() {
  

  return (
    <div>
      <div className="card">
        <h1>סוכנות נסיעות</h1>       
        <FlightsComponent />
        <FlightsComponent6 />
      </div>
    </div>
  );
}

export default App;
