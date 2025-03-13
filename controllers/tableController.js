const Table = require("../models/Table");

const tableController = {
  getAllTables: async (req, res) => {
    try {
      const tables = await Table.find();
      res.status(200).json(tables);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  getTableById: async (req, res) => {
    try {
      const table = await Table.findById(req.params.id);
      if (!table) return res.status(404).json({ message: "Không tìm thấy bàn" });
      res.status(200).json(table);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  createTable: async (req, res) => {
    try {
      const newTable = new Table(req.body);
      await newTable.save();
      res.status(201).json(newTable);
    } catch (error) {
      res.status(400).json({ message: "Lỗi khi tạo bàn", error });
    }
  },

  updateTable: async (req, res) => {
    try {
      const updatedTable = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTable) return res.status(404).json({ message: "Không tìm thấy bàn" });
      res.status(200).json(updatedTable);
    } catch (error) {
      res.status(400).json({ message: "Lỗi khi cập nhật bàn", error });
    }
  },

  deleteTable: async (req, res) => {
    try {
      const deletedTable = await Table.findByIdAndDelete(req.params.id);
      if (!deletedTable) return res.status(404).json({ message: "Không tìm thấy bàn" });
      res.status(200).json({ message: "Xóa bàn thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }
};

module.exports = tableController;
