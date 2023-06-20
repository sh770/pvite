import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import FlightsComponent from "./components/FlightsComponent";
import FlightDetailsComponent from "./components/FlightDetailsComponent";


function App() {
  return (
    <BrowserRouter>
      <div className="card">
        <h1>סוכנות הנסיעות שלך</h1>
        <Routes>
          <Route path="/pvite/" element={<FlightsComponent />} />
          <Route path="/flights/:id" element={<FlightDetailsComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
