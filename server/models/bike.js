const mongoose = require("mongoose");

const bikeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brands",
    required: true,
  },
  sizesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sizes",
    required: true,
  },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "types",
    required: true,
  },
  cityIds: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: "cities"}],
    required: true,
  },
  bikeImage: {
    type: String,
    required: true,
  },
  orderIds: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: "orders"}],
  }
});

module.exports = mongoose.model("bike", bikeSchema);
