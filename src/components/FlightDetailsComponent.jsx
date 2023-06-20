import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import flightsData from '../flights.json';

const FlightDetailsComponent = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    const fetchFlight = () => {
      const selectedFlight = flightsData.flights.find((flight) => flight.id === id);
      setFlight(selectedFlight);
    };

    fetchFlight();
  }, [id]);

  if (!flight) {
    return <div>...טוען</div>;
  }

  return (
    <div>
      <h2>פרטי הטיסה</h2>
      <div>
        <h3>מאיפה: {flight.departure}</h3>
        <h3>יעד: {flight.destination}</h3>
        <h3>מחיר: {flight.price}</h3>
        <h3>תאריך: {flight.date}</h3>
        <h3>חניות ביניים: {flight.has_parking ? 'כן' : 'לא'}</h3>
      </div>
    </div>
  );
};

export default FlightDetailsComponent;
