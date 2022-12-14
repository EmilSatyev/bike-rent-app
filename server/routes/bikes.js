const express = require("express");
const router = express.Router();
const {
  getCities,
  getSizes,
  getTypes,
  getBrands,
} = require("../controllers/bikes");


// получить размеры
router.get("/sizes", getSizes);

// получить типы
router.get("/types", getTypes);

// получить производителей
router.get("/brands", getBrands);

// получить города
router.get("/cities", getCities);

module.exports = router;
