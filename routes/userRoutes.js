const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middlewareController = require("../middlewares/middlewareController");

router.get("/", middlewareController.authenticate, userController.getAllUsers);
router.get("/me", middlewareController.authenticate, userController.getUserById);
router.put("/:id", middlewareController.authenticate, middlewareController.authorizeRoles(["admin"]), userController.updateUser);
router.delete("/:id", middlewareController.authenticate, middlewareController.authorizeRoles(["admin"]), userController.deleteUser);

module.exports = router;
