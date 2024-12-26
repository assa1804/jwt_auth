const User = require("../models/User");

const userController = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json("Delete user successfully");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController;