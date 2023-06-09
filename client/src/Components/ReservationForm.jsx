import axios from "axios";
import React, { useState } from "react";

const ReservationForm = () => {
  const [noOfSeats, setNoOfSeats] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to reserve seats
    axios
      .post("", {
        headers: {
          "Content-Type": "application/json",
        },
        noOfSeats,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Number of seats:
        <input
          type="number"
          value={noOfSeats}
          onChange={(e) => setNoOfSeats(e.target.value)}
        />
      </label>
      <button type="submit">Reserve</button>
    </form>
  );
};

export default ReservationForm;
