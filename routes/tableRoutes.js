const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");
const middlewareController = require("../middlewares/middlewareController");

router.get("/", tableController.getAllTables);
router.get("/:id", tableController.getTableById);
router.post("/", middlewareController.authenticate, middlewareController.authorizeRoles(["admin"]), tableController.createTable);
router.put("/:id", middlewareController.authenticate, middlewareController.authorizeRoles(["admin"]), tableController.updateTable);
router.delete("/:id", middlewareController.authenticate, middlewareController.authorizeRoles(["admin"]), tableController.deleteTable);

module.exports = router;
