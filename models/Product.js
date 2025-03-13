const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  stockQuantity: { type: Number, default: 0 },
  type: { type: String },
  imageProduct: { type: String },
  mainIngredients: { type: String },
});

module.exports = mongoose.model("Product", ProductSchema);
