const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  email: { type: String, unique: true },
  customerType: { type: String, enum: ["regular", "vip"], default: "regular" },
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  loyaltyPoints: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);
