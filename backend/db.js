const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://srisruthipopuri:Atchu77777@nykaa.8vv9hop.mongodb.net/?appName=nykaa"// replace with your DB name

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

module.exports = mongoose;
