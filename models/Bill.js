const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  billNumber: { type: Number, required: true, unique: true },
  orderID: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  issueDate: { type: Date, default: Date.now },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["cash", "card", "online"], default: "cash" },
  paymentDetails: { type: String },
});

module.exports = mongoose.model("Bill", BillSchema);
