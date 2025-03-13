const Product = require("../models/Product");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  createProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: "Lỗi khi tạo sản phẩm", error });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: "Lỗi khi cập nhật sản phẩm", error });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }
};

module.exports = productController;
