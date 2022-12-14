const Order = require("../models/order");

// Получить все заказы
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("cityId").exec();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось заказы",
    });
    console.warn(err);
  }
};

// Отменить заказ
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    await Order.findOneAndUpdate({ _id: orderId }, { status: "canceled" });

    res.status(201).json({ message: "успех" });
  } catch (err) {
    res.status(501).json({
      error: "Не удалось отменить заказ",
    });
    console.warn(err);
  }
};

// Продлить аренду
const extendOrder = async (req, res) => {
  try {
    const { id, extendDate, days, totalPrice } = req.body;
    await Order.findOneAndUpdate(
      { _id: id },
      {
        dateEnd: extendDate,
        days,
        totalPrice,
        isPayed: false,
      }
    );

    res.status(201).json({ message: "успех" });
  } catch (err) {
    res.status(501).json({
      error: "Не удалось продлить аренду",
    });
    console.warn(err);
  }
};

module.exports = {
  getOrders,
  cancelOrder,
  extendOrder,
};
