const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    active: { type: Boolean, default: false },
    avatar: { type: String },
    isAdmin: { type: Boolean, default: null },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
