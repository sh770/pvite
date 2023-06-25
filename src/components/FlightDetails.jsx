import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const FlightDetails = () => {
  const params = useParams();
  // console.log(params);
  const { id } = params;
  // console.log(id);
  const [flight, setFlight] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/flights/flight/${id}`
        );
        const flightData = response.data;
        setFlight(flightData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFlight();
  }, [id]);

  if (loading) {
    return <h2>טוען נתונים...</h2>;
  }

  if (error) {
    return <h2>שגיאה ... {`${error}`}</h2>;
  }

  return (
    <div>
      <h2>פרטי הטיסה</h2>
      <b> מזהה:</b>
     <br></br>
      {flight._id}<br></br>
      <b>מאיפה</b><br></br>
      {flight.departure}<br></br>
      <b>לאן</b><br></br>
      {flight.destination}<br></br>
      <b>מחיר</b><br></br>
      {flight.price}<br></br>
      <b>תאריך</b><br></br>
      {formatHumanDate(flight.date).split("-")[0]}<br></br>
      <b>נחיתת ביניים</b><br></br>
      {flight.has_parking ? "כן" : "לא"}
      </div>
  );
};

export default FlightDetails;
