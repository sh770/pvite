import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const FlightsComponent = () => {
  const [flightsData, setFlightsData] = useState({ flights: [] });
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchFlightsData = async () => {
      try {
        const response = await fetch('src/flights.json');
        console.log(response);
        const data = await response.json();
        console.log(data);
        setFlightsData({ flights: data.flights });
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlightsData();
  }, []);

  const handleRowHover = (index) => {
    setSelectedRow(index);
  };
  
  const handleRowClick = (index) => {
    console.log('Clicked row:', flightsData.flights[index]);
  };

  return (
    <div>
      <h2>רשימת טיסות</h2>
      <div className="table">
        <div className="table-row table-header">
          <div className="table-cell">מאיפה</div>
          <div className="table-cell">יעד</div>
          <div className="table-cell">מחיר</div>
          <div className="table-cell">תאריך</div>
          <div className="table-cell">חניות ביניים</div>
        </div>
        {flightsData.flights.map((flight, index) => (
          <Link
            to={`/flights/${flight.id}`} // כאן יש להגדיר את ה-URL של פרטי הטיסה
            className={`table-row ${selectedRow === index ? 'selected' : ''}`}
            key={index}
            onMouseEnter={() => handleRowHover(index)}
            onMouseLeave={() => handleRowHover(null)}
            onClick={() => handleRowClick(index)}
          >
            <div className="table-cell">{flight.departure}</div>
            <div className="table-cell">{flight.destination}</div>
            <div className="table-cell">{flight.price}</div>
            <div className="table-cell">{flight.date}</div>
            <div className="table-cell">{flight.has_parking ? 'כן' : 'לא'}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FlightsComponent;
