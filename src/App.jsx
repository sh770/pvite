import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import AllFlights from "./components/AllFlights";
import FlightDetails from "./components/FlightDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="card">
        <h1>סוכנות הנסיעות שלך</h1>
        <Routes>
          <Route path="/" element={<AllFlights />} />
          <Route path="/flight/:id" element={<FlightDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
