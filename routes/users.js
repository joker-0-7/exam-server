var express = require("express");
var router = express.Router();
const { verifyToken, isValidDate } = require("../middlewares/auth");
const userController = require("../controllers/userController");
const verifyUser = require("../middlewares/verifyUser");
/* GET users listing. */
router.post("/login", userController.login);
router.post("/regester", userController.register);
router.post("/reset-information/:id", userController.resetInformation);
router.get("/", verifyToken, verifyUser, isValidDate, userController.getUsers);
router.put(
  "/change-status/:id",
  verifyToken,
  verifyUser,
  isValidDate,
  userController.changeStatus
);
router.get(
  "/subjects",
  verifyToken,
  verifyUser,
  isValidDate,
  userController.getSubjects
);
router.get(
  "/sources",
  verifyToken,
  verifyUser,
  isValidDate,
  userController.getSources
);
router.put(
  "/update-password/:id",
  verifyToken,
  verifyUser,
  isValidDate,
  userController.updatePassword
);
router.get("/current", verifyToken, userController.current);

module.exports = router;
