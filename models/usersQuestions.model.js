const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersQuestions = new Schema({
  _id: { type: String, ref: "User" },
  questionId: String,
});
