const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} = require("../controllers/orderController");

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);

module.exports = router;
