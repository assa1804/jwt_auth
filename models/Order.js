const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderID: { type: String, required: true, unique: true },
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  imageOrder: { type: String },
  totalAmount: { type: Number, required: true },
  specialNotes: { type: String },
  orderType: { type: String, enum: ["dine-in", "takeaway", "delivery"], default: "dine-in" },
});

module.exports = mongoose.model("Order", OrderSchema);
