const User = require("../models/User");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { userId } = req.user
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({ message: "Không tìm thấy người dùng" });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: "Lỗi khi cập nhật", error });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ message: "Không tìm thấy người dùng" });
      res.status(200).json({ message: "Xóa người dùng thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }
};

module.exports = userController;
