const mongoose = require("mongoose");

const citiesSchema = mongoose.Schema({
  value: {
    type: String,
  },
  label: {
    type: String,
  },
});

module.exports = mongoose.model("cities", citiesSchema);
