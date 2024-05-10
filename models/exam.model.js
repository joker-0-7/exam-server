const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var examSchema = new Schema({
  sources: { type: Array, required: true },
  subjects: { type: Array, required: true },
  answers: { type: Array, required: true },
  question: { type: String, required: true },
  correct: { type: String, required: true },
  image: { type: String },
  explanation: { type: String },
});

module.exports = mongoose.model("Exam", examSchema);
