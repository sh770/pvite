import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import FlightDetails from "./FlightDetails";
import { useNavigate } from "react-router-dom";

// הפונקציה הסינון של useReducer
const reducer = (state, action) => {
  switch (action.type) {
    case "FLIGHT_REQUEST_LOADING":
      return { ...state, loading: true };
    case "FLIGHT_REQUEST_SUCCESS":
      return { ...state, loading: false, flights: action.payload };
    case "FLIGHT_REQUEST_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

const AllFlights = () => {

  const navigate = useNavigate()

  // משתנה state לניהול שורה נבחרת
  const [selectedRow, setSelectedRow] = useState(null);
  // משתנה state לניהול טיסה נבחרת
  const [selectedFlight, setSelectedFlight] = useState(null);

  // משתנה state מורכב באמצעות useReducer
  const [{ flights, loading, error }, dispatch] = useReducer(reducer, {
    flights: [],
    loading: true,
    error: "",
  });

  // useEffect לטעינת הנתונים ברגע שהקומפוננטה מתאחדת
  useEffect(() => {
    const fetchFlights = async () => {
      dispatch({ type: "FLIGHT_REQUEST_LOADING" });
      try {
        const response = await axios.get("http://localhost:4500/api/flights");
        const allFlights = response.data;
        console.log(allFlights);
        dispatch({ type: "FLIGHT_REQUEST_SUCCESS", payload: allFlights });
      } catch (error) {
        dispatch({ type: "FLIGHT_REQUEST_ERROR", payload: error });
      }
    };
    fetchFlights();
  }, []);

  // פונקציה שמתבצעת כאשר מעבירים את העכבר מעל שורה
  const handleRowHover = (index) => {
    setSelectedRow(index);
  };

  // פונקציה שמתבצעת כאשר לוחצים על שורה
  const handleRowClick = (index) => {
    const selectedFlight = flights[index]._id;
    setSelectedFlight(selectedFlight);
  };

  // פונקציה לפורמט מחדש של תאריך בפורמט אנושי
  const formatHumanDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
    };
    return date.toLocaleDateString("he-IL", options);
  };

  if (loading) {
    return <h2>טוען נתונים...</h2>;
  }

  if (error) {
    return <h2>שגיאה ... {`${error}`}</h2>;
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>מאיפה</th>
            <th>יעד</th>
            <th>מחיר</th>
            <th>תאריך</th>
            <th>חניית ביניים</th>
          </tr>
        </thead>
        <tbody>
          {/* מעבר על הטיסות ויצירת שורה לכל טיסה */}
          {flights.map((flight, index) => (
            
            <tr
              className={`table-row ${
                selectedRow === index ? "selected" : ""
              }`}
              key={flight.slug}
              onMouseEnter={() => handleRowHover(index)}
              onMouseLeave={() => handleRowHover(null)}
              onDoubleClick={() => handleRowClick(index)}
              onClick={() => navigate(`/flight/${flight._id}`)}
            >
              <td className="table-cell">{flight.departure}</td>
              <td className="table-cell">{flight.destination}</td>
              <td className="table-cell">{flight.price}</td>
              <td className="table-cell">
                {formatHumanDate(flight.date).split("-")[0]}
              </td>
              <td className="table-cell">
                {flight.has_parking ? "כן" : "לא"}
              </td>
              
            </tr>
            
          ))}
        </tbody>
      </table>
      {/* הצגת פרטי טיסה כאשר יש טיסה נבחרת */}
      {selectedFlight && (
        <FlightDetails flightId={selectedFlight} />
      )}
    </div>
  );
};

export default AllFlights;
