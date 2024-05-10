const express = require("express");
const router = express.Router();
const quizzesControll = require("../controllers/quizzes.controll");
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

router.get("/", quizzesControll.getQuizzes);
router.post("/", upload.single("img"), quizzesControll.addQuiz);
router.post("/user", verifyToken, quizzesControll.addQuizUsers);
router.patch("/user", verifyToken, quizzesControll.addQuizToUser);
router.get("/user", verifyToken, quizzesControll.getQuizUsers);

module.exports = router;