const express = require("express");
const router = express.Router();
const { getOrders, cancelOrder } = require("../controllers/orders");

// получить все заказы
router.get("/orders", getOrders);

// отменить заказ
router.patch("/orders/cancel", cancelOrder);

module.exports = router;
