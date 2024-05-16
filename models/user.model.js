const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String },
    active: { type: Boolean, default: false },
    avatar: { type: String },
    isAdmin: { type: Boolean, default: null },
    activate: { type: Number, default: null },
    totalExam: { type: Number, default: 0 },
    compeleteExams: { type: Number, default: 0 },
    faildExams: { type: Number, default: 0 },
    quizzes: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
