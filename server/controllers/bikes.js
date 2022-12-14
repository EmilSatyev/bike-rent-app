const Bike = require("../models/bike");
const City = require("../models/сity");
const BikeType = require("../models/type");
const Brand = require("../models/brand");
const Size = require("../models/size");

// Получить все велосипеды
const getBikes = async (req, res) => {
  try {
    const search = req.query.search || "";

    const bikes = await Bike.find({
      name: { $regex: search, $options: "i" },
    })
      .populate("cityIds")
      .exec();

    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить список велосипедов",
    });
    console.warn(err);
  }
};

// получить велик
const getSingleBike = async (req, res) => {
  try {
    const bike = await Bike.find({ _id: req.params.id });
    res.status(200).json(bike);
  } catch (err) {
    res.status(400).json({
      message: "Не удалось получить велик",
    });
    console.warn(err);
  }
};

//
// Получить города
const getCities = async (req, res) => {
  try {
    const cities = await City.find();

    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось города",
    });
    console.warn(err);
  }
};

// Получить типы
const getTypes = async (req, res) => {
  try {
    const types = await BikeType.find();

    res.status(200).json(types);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить типы велосипедов",
    });
    console.warn(err);
  }
};

// Получить производителей
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить производителей",
    });
    console.warn(err);
  }
};

// Получить размеры
const getSizes = async (req, res) => {
  try {
    const sizes = await Size.find();

    res.status(200).json(sizes);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить размеры",
    });
    console.warn(err);
  }
};

module.exports = {
  getCities,
  getBrands,
  getTypes,
  getSizes,
  getBikes,
  getSingleBike,
};
