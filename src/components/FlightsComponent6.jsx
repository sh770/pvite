// import React from 'react';
import flightsData from '../flights.json';

const FlightsComponent6 = () => {
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
          <div className="table-row" key={index}>
            <div className="table-cell">{flight.departure}</div>
            <div className="table-cell">{flight.destination}</div>
            <div className="table-cell">{flight.price}</div>
            <div className="table-cell">{flight.date}</div>
            <div className="table-cell">{flight.has_parking ? 'כן' : 'לא'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightsComponent6;
