import React from "react";
import SeatLayout from "./Components/SeatLayout";
import ReservationForm from "./Components/ReservationForm";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Seat Reservation</h1>
      <SeatLayout />
      <ReservationForm />
    </div>
  );
}

export default App;
