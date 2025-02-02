const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  img: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
