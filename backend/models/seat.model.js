const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    seatNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
  }
);

const SeatModel = mongoose.model("Seats", seatSchema);

module.exports = {
  SeatModel,
};
