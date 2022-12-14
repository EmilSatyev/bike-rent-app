// const Order = require("../models/order");

// Получить все заказы
const getOrders = async (req, res) => {
  // try {
  //   const orders = await Order.find().populate("cityId").exec();
  //   res.status(200).json(orders);
  // } catch (err) {
  //   res.status(500).json({
  //     message: "Не удалось заказы",
  //   });
  //   console.warn(err);
  // }
  res.status(200).json({cs:"sd"});
};

module.exports = {
  getOrders,
};
