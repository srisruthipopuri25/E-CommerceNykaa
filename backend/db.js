const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>"; // replace with your DB name

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

module.exports = mongoose;
