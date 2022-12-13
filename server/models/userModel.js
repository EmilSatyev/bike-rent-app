const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    orderIds: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }],
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// hash user's password with salt before saving document to db
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(7);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.pre("findOneAndUpdate", async function () {
  if (this._update.hasOwnProperty("password")) {
    const salt = await bcrypt.genSalt(7);
    this._update.password = await bcrypt.hash(this._update.password, salt);
  }
});

// extend matchPassword function unto userSchema
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
