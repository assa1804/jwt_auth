const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  tableID: { type: Number, required: true, unique: true },
  area: { type: String },
  status: { type: String, enum: ["available", "occupied", "reserved"], default: "available" },
  capacity: { type: Number, required: true },
  specialNotes: { type: String },
  employeeID: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
});

module.exports = mongoose.model("Table", TableSchema);
