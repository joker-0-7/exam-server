require("dotenv").config();
var { expressjwt: jwt } = require("express-jwt");
const userModel = require("../models/user.model");
const jsonwt = require("jsonwebtoken");
// Middleware to validate JWT tokens
const isValidUser = jwt({
  secret: process.env.JWT_SECRET, // Provide your JWT secret key
  algorithms: ["HS256"], // Specify the algorithms used to sign the JWT token
});

// exporting a middleware that will check if user's token has expired or not
async function isTokenExpired(req, res, next) {
  let err = new Error("Authentication error");
  err.status = 401;
  // checking if req.user (the decoded payload of the token) exists and then checking its exp property
  if (Date.now() / 1000 > req.current.exp) return next(err);
  else next();
}
const verifyToken = (req, res, next) => {
  const authorization =
    req.headers["Authorization"] || req.headers["authorization"];
  try {
    const decoded = jsonwt.verify(authorization, process.env.JWT_SECRET);
    req.current = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "You Shoud Sign In" });
  }
};
/**
 * Checks whether the request is made by an admin or not. If it isn't, it throws an unauthorized error.
 */
async function isAdmin(req, res, next) {
  const user = await userModel.findById(req.current.userId);
  if (user && user.isAdmin === true) return next();
  else {
    return res.status(401).json({ msg: "Unauthorized - Admin only resource" });
  }
}

/**
 * This middleware checks if the requested id in the params matches with the logged user id.
 * It can be used to protect against data leakage when updating/deleting resources.
 */
function ownsResource(req, res, next) {
  if (String(req.params.id) !== String(req.user._id)) {
    let err = new Error("You don't have permission to perform this action.");
    err.status = 403;
    return next(err);
  }
  next();
}
module.exports = {
  isValidUser,
  isTokenExpired,
  isAdmin,
  ownsResource,
  verifyToken,
};
