const express = require("express");
const router = express.Router();
const {
  getBikes,
  createBike,
  getSingleBike,
  getCities,
  getTypes,
  getBrands,
  getSizes,
  removeBike,
} = require("../controllers/bikes");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./assets/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// получить все велосипеды
router.get("/bikes", getBikes);
/*
// создать велосипед
router.post("/bikes", upload.single("bikeImage"), createBike);

// получить велик
router.get("/bikes/:id", getSingleBike);

// удалить велик
router.delete("/bikes/:id", removeBike);

// получить города
router.get("/cities", getCities);

// получить типы
router.get("/types", getTypes);

// получить произвотелей
router.get("/brands", getBrands);

// получить размеры
router.get("/sizes", getSizes);*/

module.exports = router;
