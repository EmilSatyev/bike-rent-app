const Order = require("../models/order");
const City = require("../models/сity");
const Bike = require("../models/bike");
const User = require("../models/userModel");

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

// Создать заказ
const createOrder = async (req, res) => {
  try {
    const { userId, dateStart, dateEnd, city, bikesId, totalPrice, days } =
      req.body;
    const cities = await City.find();
    const cityId = cities.find((c) => c.value === city)._id;

    const order = await Order.create({
      dateStart,
      dateEnd,
      cityId,
      bikesId,
      totalPrice,
      days,
      isPayed: false,
      status: "processing",
    });

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { orderIds: order._id } }
    );

    await Bike.updateMany(
      {
        _id: {
          $in: bikesId,
        },
      },
      { $push: { orderIds: order._id } }
    );

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось добавить заказ",
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
  createOrder,
  cancelOrder,
  extendOrder,
};
