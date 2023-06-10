const express = require("express");
const seatRouter = express.Router();
const { SeatModel } = require("../models/seat.model");

// Book seats
const totalSeats = 80;
const seatsInRow = 7;
const lastRowSeats = 3;

const seats = new Array(totalSeats).fill(false);

const bookSeats = (seatCount) => {
  const result = [];
  for (let i = 0; i <= totalSeats - seatCount; i++) {
    let seatsPerRow = i < totalSeats - lastRowSeats ? seatsInRow : lastRowSeats;
    if (
      (i % seatsPerRow) + seatCount <= seatsPerRow &&
      seats.slice(i, i + seatCount).every((x) => x === false)
    ) {
      const newSeats = [...seats];
      for (let j = 0; j < seatCount; j++) {
        const seatIndex = i + j;
        newSeats[seatIndex] = true;
        const seatNumber = generateSeatNumber(seatIndex);
        result.push({ seatNumber: seatNumber, isAvailable: false });
      }
      seats.splice(0, totalSeats, ...newSeats);
      break;
    }
  }

  return result;
};

const generateSeatNumber = (seatIndex) => {
  let rowLetter = String.fromCharCode(
    "a".charCodeAt(0) + Math.floor(seatIndex / seatsInRow)
  );
  let seatNumber = (seatIndex % seatsInRow) + 1;
  if (seatIndex >= totalSeats - lastRowSeats) {
    rowLetter = "z";
    seatNumber = seatIndex - (totalSeats - lastRowSeats) + 1;
  }
  return rowLetter + seatNumber;
};

// Fetching the booked seats
seatRouter.get("/bookedseats", async (req, res) => {
  try {
    const bookedSeats = await SeatModel.find();
    res.status(200).send({ bookedSeats });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// Book seats
seatRouter.post("/booked", async (req, res) => {
  const seatCount = parseInt(req.body.noOfSeats);
  const newBookedSeats = bookSeats(seatCount);

  if (newBookedSeats.length > 0) {
    const seatDocuments = newBookedSeats.map((seat) => {
      return {
        seatNumber: seat.seatNumber,
        isAvailable: seat.isAvailable,
      };
    });

    console.log(seatDocuments);

    try {
      const newSeatBook = new SeatModel({ seatNumber: seatDocuments });
      await newSeatBook.save();
      res.status(200).send({ msg: "New seats booked" });
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  } else {
    res.status(400).json({ error: "No seats available" });
  }
});

module.exports = {
  seatRouter,
};
