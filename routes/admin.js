const express = require("express");
var router = express.Router();
const { isAdmin, verifyToken, isTokenExpired } = require("../middlewares/auth");
const adminController = require("../controllers/admin.controller");
/* GET users listing. */
router.post("/login", adminController.login);
router.post(
  "/add-subject",
  verifyToken,
  isAdmin,
  isTokenExpired,
  adminController.addSubject
);
router.get(
  "/current",
  verifyToken,
  isAdmin,
  isTokenExpired,
  adminController.current
);
router.get(
  "/subject/:id",
  verifyToken,
  isAdmin,
  isTokenExpired,
  adminController.getSubject
);
router.put(
  "/subject/:id",
  verifyToken,
  isAdmin,
  isTokenExpired,
  adminController.updateSubject
);
router.delete(
  "/subject/:id",
  verifyToken,
  isAdmin,
  isTokenExpired,
  adminController.deleteSubject
);
router.post(
  "/add-source",
  verifyToken,
  isAdmin,
  isTokenExpired,
  adminController.addSource
);
router.get(
  "/source/:id",
  verifyToken,
  isAdmin,
  isTokenExpired,
  adminController.getSource
);
router.put(
  "/source/:id",
  verifyToken,
  isAdmin,
  isTokenExpired,
  adminController.updateSource
);
router.delete(
  "/source/:id",
  verifyToken,
  isAdmin,
  isTokenExpired,
  adminController.deleteSource
);
router.delete(
  "/user/:id",
  verifyToken,
  isAdmin,
  isTokenExpired,
  adminController.deleteUser
);
router.patch(
  "/user/:id",
  verifyToken,
  isAdmin,
  isTokenExpired,
  adminController.endDateUser
);

module.exports = router;
