const express = require("express");
const router = express.Router();
const { getOrders, cancelOrder, extendOrder } = require("../controllers/orders");

// получить все заказы
router.get("/orders", getOrders);

// отменить заказ
router.patch("/orders/cancel", cancelOrder);

// продлить аренду
router.patch("/orders/extend", extendOrder);

module.exports = router;
