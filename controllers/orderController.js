const Order = require("../models/Order");

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  createOrder: async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ message: "Lỗi khi tạo đơn hàng", error });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedOrder) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: "Lỗi khi cập nhật đơn hàng", error });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      if (!deletedOrder) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
      res.status(200).json({ message: "Xóa đơn hàng thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }
};

module.exports = orderController;
