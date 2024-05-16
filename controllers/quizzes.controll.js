const examModel = require("../models/exam.model");
const PastPapers = require("../models/pastPapres.model");
const QuizUsers = require("../models/quiz.model");

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await examModel.find();
    return res.status(200).json(quizzes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const addQuiz = async (req, res) => {
  const data = req.body;
  data.image = req.uniqueSuffix || "";
  console.log(data);
  try {
    const quiz = await examModel.create(data);
    return res.status(201).json({ msg: "Done Create Exam" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const addQuizUsers = async (req, res) => {
  const data = req.body.data;
  const id = req.current.userId;
  const existQuiz = await QuizUsers.findOne({ studentId: id });
  if (existQuiz) {
    let answeredQuestions = [];
    const id = existQuiz._id;
    if (data.adv == false) {
      answeredQuestions = existQuiz.question.map((qId) => qId.questionId);
    }
    try {
      const updata = await QuizUsers.findByIdAndUpdate(id, {
        $push: { question: data.question },
        subjects: data.subjects,
        sources: data.sources,
        mode: data.mode,
      });
      const exam = await examModel.aggregate([
        {
          $match: {
            sources: { $in: data.sources },
            subjects: { $in: data.subjects },
            _id: { $nin: answeredQuestions },
          },
        },
        { $sample: { size: data.count || 100 } },
      ]);

      return res.status(201).json({ msg: "Done Updated Docmintation", exam });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const quiz = await QuizUsers.create({
        studentId: req.current.userId,
        sources: data.sources,
        subjects: data.subjects,
        mode: data.mode,
      });
      return res.status(201).json({ msg: "Done Create Exam", quiz });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};
const getQuizUsers = async (req, res) => {
  const data = req.body;
  try {
    const quiz = await QuizUsers.find().populate({
      path: "studentId",
      select: "firstName lastName",
    });
    return res.status(201).json(quiz);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const addQuizToUser = async (req, res) => {
  const data = req.body.data;
  const id = req.current.userId;
  try {
    const existQuiz = await QuizUsers.exists({ studentId: id });
    if (existQuiz) {
      const questionsToAdd = Object.entries(data).map(
        ([questionId, value]) => ({ questionId, value })
      );
      const quiz = await QuizUsers.findByIdAndUpdate(
        existQuiz._id,
        { $push: { question: { $each: questionsToAdd } } },
        { new: true }
      );
      return res.status(201).json({ msg: "Done Create Exam", quiz });
    } else {
      return res.status(400).json({ msg: "Documentation Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getQuizzesUser = async (req, res) => {
  const data = req.body;
  try {
    const quiz = await QuizUsers.find({
      studentId: req.current.userId,
    }).populate({
      path: "question.questionId",
      select: "question",
    });
    return res.status(201).json(quiz);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const addPastPapers = async (req, res) => {
  const data = req.body.data;
  try {
    const pastPaper = await PastPapers.create(data);
    return res.status(201).json({ msg: "Done Created Exam", pastPaper });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getPastPapers = async (req, res) => {
  try {
    const pastPapera = await PastPapers.find({}, { data: 0 });
    return res.status(200).json(pastPapera);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getPastPaper = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const pastPaper = await PastPapers.findById(id);
    return res.status(200).json(pastPaper);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = {
  getQuizzes,
  addQuiz,
  addQuizUsers,
  getQuizUsers,
  addQuizToUser,
  getQuizzesUser,
  addPastPapers,
  getPastPapers,
  getPastPaper,
};
