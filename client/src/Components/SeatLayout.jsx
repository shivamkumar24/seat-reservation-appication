import axios from "axios";
import React, { useState, useEffect } from "react";

const SeatLayout = () => {
  const [seats, setSeats] = useState([]);

  const getSeatData = () => {
    // Fetch seat availability data
    axios
      .get("")
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSeatData();
  }, []);

  return (
    <div>
      {/* Display the seat layout, availability, and reservation status */}
      <h1 style={{ textAlign: "center" }}>SeatLayout</h1>
    </div>
  );
};

export default SeatLayout;
