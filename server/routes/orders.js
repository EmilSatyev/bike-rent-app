const express = require("express");
const router = express.Router();
const {
  getOrders,
  cancelOrder,
  extendOrder,
  createOrder,
} = require("../controllers/orders");

// получить все заказы
router.get("/orders", getOrders);

// создать заказ
router.post("/orders", createOrder);

// отменить заказ
router.patch("/orders/cancel", cancelOrder);

// продлить аренду
router.patch("/orders/extend", extendOrder);

module.exports = router;
