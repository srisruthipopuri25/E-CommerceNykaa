const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  brand: String,
  category: String,
  thumbnail: String,
});

module.exports = mongoose.model("Product", productSchema);
