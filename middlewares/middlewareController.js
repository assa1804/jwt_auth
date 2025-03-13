const jwt = require("jsonwebtoken");

// Middleware xác thực & kiểm tra quyền
const middlewareController = {
  authenticate: (req, res, next) => {
    try {
      // Lấy token từ headers
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Bạn chưa đăng nhập!" });
      }

      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Token không hợp lệ!" });
        }

        req.user = user; // Lưu user vào request để sử dụng ở API tiếp theo
        next();
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi xác thực!", error });
    }
  },

  authorizeRoles: (roles = []) => {
    return (req, res, next) => {
      if (!req.user || (roles.length && !roles.includes(req.user.role))) {
        return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
      }
      next();
    };
  }
};

module.exports = middlewareController;
