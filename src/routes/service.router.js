const express = require("express");
const {
  addService,
  getServices,
  getService,
  updateServiceDetails,
  removeService
} = require("../controllers/service.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authenticateToken, addService);
router.get("/", authenticateToken, getServices);
router.get("/:id", authenticateToken, getService);
router.put("/:id", authenticateToken, updateServiceDetails);
router.delete("/:id", authenticateToken, removeService);
module.exports = router;
