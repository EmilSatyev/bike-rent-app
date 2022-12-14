const express = require("express");
const router = express.Router();
const {
  getBikes,
  getCities,
  getSizes,
  getTypes,
  getBrands,
  getSingleBike
} = require("../controllers/bikes");

// получить все велосипеды
router.get("/bikes", getBikes);

// получить велик
router.get("/bikes/:id", getSingleBike);

// получить размеры
router.get("/sizes", getSizes);

// получить типы
router.get("/types", getTypes);

// получить производителей
router.get("/brands", getBrands);

// получить города
router.get("/cities", getCities);

module.exports = router;
