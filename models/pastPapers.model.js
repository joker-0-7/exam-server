const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PastPapersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String },
  },
  { timestamps: true }
);

const PastPapers = mongoose.model("PastPapers", PastPapersSchema);
module.exports = PastPapers;
