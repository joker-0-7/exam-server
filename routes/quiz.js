const express = require("express");
const router = express.Router();
const quizzesController = require("../controllers/quizzes.controller");
const { verifyToken } = require("../middlewares/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const mimetype = file.mimetype.split("/")[1];
    const uniqueSuffix = `user-${Date.now()}.${mimetype}`;
    req.uniqueSuffix = uniqueSuffix;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

router.get("/current/:current", quizzesController.getQuizzes);
router.post("/", upload.single("img"), quizzesController.addQuiz);
router.get("/update/:id", quizzesController.getQuestion);
router.patch(
  "/update/:id",
  upload.single("img"),
  quizzesController.updateQuestion
);
router.delete("/:id", quizzesController.deleteQuestion);
router.post("/user", verifyToken, quizzesController.addQuizUsers);
router.patch("/user", verifyToken, quizzesController.addQuizToUser);
router.get("/user", verifyToken, quizzesController.getQuizUsers);
router.get("/quizzes", verifyToken, quizzesController.getQuizzesUser);
router.get(
  "/previous-questions",
  verifyToken,
  quizzesController.getPreviousQuestions
);

router.post("/past-papers", verifyToken, quizzesController.addPastPapers);
router.get("/past-papers", verifyToken, quizzesController.getPastPapers);
router.get("/past-paper/:id", verifyToken, quizzesController.getPastPaper);
router.get("/count/quiz", quizzesController.getQuestionsCount);
module.exports = router;
