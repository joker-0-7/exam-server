const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var examSchema = new Schema({
  type: { type: String, required: true },
  subject: { type: String, required: true },
  quizs: { type: Array, required: true },
});

module.exports = mongoose.model("Exam", examSchema);
