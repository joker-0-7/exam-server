var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminsRouter = require("./routes/admin");
var quizRouter = require("./routes/quiz");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Done Connection To Data Base"))
  .catch((error) => console.log("Faild Connection " + error));

app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/admin", adminsRouter);
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  return res.status(err.status || 500).json({ msg: err.message });
});

module.exports = app;