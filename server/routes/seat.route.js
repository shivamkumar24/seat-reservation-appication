const express = require("express");
const seatRouter = express.Router();
const { SeatModel } = require("../models/seat.model");

// Get seat availability status for the entire coach
seatRouter.get("/seats", async (req, res) => {
  try {
    const seats = await SeatModel.find();
    res.status(200).send({ seats });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// Reserve seats based on the given number of seats requested
seatRouter.post("/reserve", async (req, res) => {
  const { noOfSeats } = req.body;

  try {
    // Find available seats based on the given criteria
    const availableSeats = await findAvailableSeats(noOfSeats);

    if (availableSeats.length === noOfSeats) {
      // Update the availability status of the reserved seats
      await SeatModel.updateMany(
        { _id: { $in: availableSeats.map((seat) => seat._id) } },
        { isAvailable: false }
      );

      res.status(200).send({
        msg: "Seats reserved successfully",
        seats: availableSeats,
      });
    } else {
      res.status(400).send({ msg: error.message });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// Helper function to find available seats based on the given criteria
async function findAvailableSeats(noOfSeats) {
  const seats = await SeatModel.find({ isAvailable: true });

  // implement the logic to book in one row or nearby seats

  return seats.slice(0, noOfSeats);
}

module.exports = {
  seatRouter,
};
