const express = require("express");
const router = express.Router();
const {
  getOrders,
} = require("../controllers/orders");

// получить все заказы
router.get("/orders", getOrders);


module.exports = router;
