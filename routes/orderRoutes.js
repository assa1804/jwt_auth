const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const middlewareController = require("../middlewares/middlewareController");

router.get("/", middlewareController.authenticate, orderController.getAllOrders);
router.get("/:id", middlewareController.authenticate, orderController.getOrderById);
router.post("/", middlewareController.authenticate, orderController.createOrder);
router.put("/:id", middlewareController.authenticate, orderController.updateOrder);
router.delete("/:id", middlewareController.authenticate, middlewareController.authorizeRoles(["admin"]), orderController.deleteOrder);

module.exports = router;
