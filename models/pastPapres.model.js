const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PastPapersSchema = new Schema({
  quizName: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    // required: true,
  },
},{timestamps: true});

const PastPapers = mongoose.model("PastPapers", PastPapersSchema);
module.exports = PastPapers;
