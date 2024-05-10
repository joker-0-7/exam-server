const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizUsersSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    question: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: "Exam",
        },
        value: {
          type: String,
          default: null,
        },
      },
    ],
    mode: {
      type: String,
      default: null,
    },
    subjects: {
      type: Array,
    },
    sources: {
      type: Array,
    },
  },
  { timestamps: true }
);

const QuizUsers = mongoose.model("QuizUsers", quizUsersSchema);
module.exports = QuizUsers;
