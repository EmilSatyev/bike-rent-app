const express = require("express");
const {
  getOrders,
  createOrder,
  cancelOrder,
  extendOrder,
} = require("../controllers/orders");
const router = express.Router();

// получить все заказы
router.get("/orders", getOrders);

// создать заказ
router.post("/orders", createOrder);

// отменить заказ
router.patch("/orders/cancel", cancelOrder);

// продлить аренду
router.patch("/orders/extend", extendOrder);

module.exports = router;
