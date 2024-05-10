var express = require("express");
var router = express.Router();
const { isAdmin, verifyToken, isTokenExpired } = require("../middlewares/auth");
const userController = require("../controllers/userController");
const verifyUser = require("../middlewares/verifyUser");
/* GET users listing. */
router.post("/login", userController.login);
router.post("/regester", userController.register);
router.get("/", verifyToken, verifyUser, userController.getUsers);
router.put(
  "/change-status/:id",
  verifyToken,
  verifyUser,
  userController.changeStatus
);
router.get("/subjects", verifyToken, verifyUser, userController.getSubjects);
router.get("/sources", verifyToken, verifyUser, userController.getSources);
router.put(
  "/update-password/:id",
  verifyToken,
  verifyUser,
  userController.updatePassword
);

module.exports = router;
