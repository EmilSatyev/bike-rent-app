const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  value: {
    type: String,
  },
  label: {
    type: String,
  },
});
// 
module.exports = mongoose.model("brands", brandSchema);