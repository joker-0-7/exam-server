var express = require("express");
var router = express.Router();
const { isAdmin, verifyToken, isTokenExpired } = require("../middlewares/auth");
const userController = require("../controllers/userController");
/* GET users listing. */
router.post("/login", userController.login);
router.post("/regester", userController.register);
router.get("/", userController.getUsers);
router.put("/change-status/:id", userController.changeStatus);
router.get("/subjects", userController.getSubjects);
router.get("/sources", userController.getSources);
router.put("/update-password/:id", userController.updatePassword);

module.exports = router;
