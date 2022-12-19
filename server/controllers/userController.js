const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");
const Order = require("../models/order");

const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, email, password } = req.body;
  // check if email exists in db
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("Пользователь с таким именем уже зарегистрирован");
  }

  // create new user document in db
  const user = await User.create({ name, phone, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userToken: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Неверный email или пароль");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  // req.user was set in authMiddleware.js
  const user = await User.findById(req.user._id).populate({
    path: "orderIds",
    populate: { path: "bikesId", populate: "orderIds" },
  });

  if (user?.orderIds && user.orderIds.length) {
    const now = new Date();
    await Order.updateMany({ dateEnd: {$lt: now} }, { status: "completed" });
  }

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      orderIds: user.orderIds,
      totalPrice: user.totalPrice,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const updateObj = req.body;

  if (updateObj.hasOwnProperty("email")) {
    const isDuplicatedEmail = await User.findOne({ email: updateObj.email });
    if (isDuplicatedEmail) {
      res.status(404);
      throw new Error("Пользователь с таким email уже есть");
    }
  }

  const user = await User.findOneAndUpdate({ _id: updateObj.id }, updateObj, {
    new: true,
  }).populate({
    path: "orderIds",
    populate: { path: "bikesId", populate: "orderIds" },
  });

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      orderIds: user.orderIds,
      totalPrice: user.totalPrice,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
