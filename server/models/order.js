const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cities",
    required: true,
  },
  bikesId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "bike" }],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  isPayed: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("orders", ordersSchema);
