const Bill = require("../models/Bill");

const billController = {
  getAllBills: async (req, res) => {
    try {
      const bills = await Bill.find();
      res.status(200).json(bills);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  getBillById: async (req, res) => {
    try {
      const bill = await Bill.findById(req.params.id);
      if (!bill) return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
      res.status(200).json(bill);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  createBill: async (req, res) => {
    try {
      const newBill = new Bill(req.body);
      await newBill.save();
      res.status(201).json(newBill);
    } catch (error) {
      res.status(400).json({ message: "Lỗi khi tạo hóa đơn", error });
    }
  },

  updateBill: async (req, res) => {
    try {
      const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBill) return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
      res.status(200).json(updatedBill);
    } catch (error) {
      res.status(400).json({ message: "Lỗi khi cập nhật hóa đơn", error });
    }
  },

  deleteBill: async (req, res) => {
    try {
      const deletedBill = await Bill.findByIdAndDelete(req.params.id);
      if (!deletedBill) return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
      res.status(200).json({ message: "Xóa hóa đơn thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }
};

module.exports = billController;
