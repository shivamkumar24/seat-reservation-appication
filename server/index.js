const cors = require("cors");
const express = require("express");
const { connection } = require("./db");
const { seatRouter } = require("./routes/seat.route");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", seatRouter);

app.listen(2700, async () => {
  try {
    await connection;
    console.log("Connected to the Database");
  } catch (error) {
    console.log("Connection Error:", error);
  }
  console.log(`Server is running on port 2700`);
});
