const mongoose = require("mongoose");

const typesSchema = mongoose.Schema({
  value: {
    type: String,
  },
  label: {
    type: String,
  },
});
//
module.exports = mongoose.model("types", typesSchema);