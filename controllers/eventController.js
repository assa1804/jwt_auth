const Event = require("../models/Event");

const eventController = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  getEventById: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: "Không tìm thấy sự kiện" });
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  createEvent: async (req, res) => {
    try {
      const newEvent = new Event(req.body);
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo sự kiện", error });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedEvent) return res.status(404).json({ message: "Không tìm thấy sự kiện" });
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật sự kiện", error });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) return res.status(404).json({ message: "Không tìm thấy sự kiện" });
      res.status(200).json({ message: "Đã xóa sự kiện" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa sự kiện", error });
    }
  }
};

module.exports = eventController;
