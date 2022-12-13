const mongoose = require("mongoose");

const sizeSchema = mongoose.Schema({
  value: {
    type: String,
  },
  label: {
    type: String,
  },
});

module.exports = mongoose.model("sizes", sizeSchema);
