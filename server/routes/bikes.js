const express = require("express");
const router = express.Router();
const {
  getCities,
} = require("../controllers/bikes");



// получить города
router.get("/cities", getCities);


module.exports = router;
