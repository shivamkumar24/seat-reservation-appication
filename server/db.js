const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://shivamkumar24:shivamkumar24@cluster0.uwarmhn.mongodb.net/cluster0?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};

// const url =
//   "mongodb+srv://shivamkumar24:shivamkumar24@outfit.sqlzvza.mongodb.net/outfit?retryWrites=true&w=majority";

// ("mongodb+srv://shivamkumar24:<password>@cluster0.uwarmhn.mongodb.net/cluster0?retryWrites=true&w=majority");
