const subjectModel = require("../models/subject.model");
const userSchema = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const System = require("../models/system.model");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(404)
      .json({ msg: "Please provide username and password" });
  try {
    let user = await userSchema.findOne({ email });
    if (!user)
      return res.status(401).json({ msg: "This User Is Not Registered" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(404).json({ msg: "Invalid Password" });
    if (!user.isAdmin)
      return res
        .status(401)
        .json({ msg: "Unauthorized - Admin only resource" });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.password = undefined;
    if (user.active == false)
      return res
        .status(404)
        .json({ msg: "Your Account Is Not Activated Yet!" });
    return res.status(200).json({ token, user: user });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ msg: "Faild To Login, Please Try Again Later." });
  }
};

const addSubject = async (req, res) => {
  const data = req.body.subject;
  if (!data || !data.name)
    return res.status(404).json({ msg: "You Should Add Subject Name" });
  try {
    const subject = await subjectModel(data);
    subject.save();
    return res.status(201).json({ msg: "Done Created" });
  } catch (err) {
    return res
      .status(404)
      .json({ msg: "Faild To Add Subject, Please Try Again Later" });
  }
};
const getSubject = async (req, res) => {
  const id = req.params.id;
  try {
    const subject = await subjectModel.findById(id);
    return res.status(201).json(subject);
  } catch (err) {
    return res
      .status(404)
      .json({ msg: "Faild To Add Subject, Please Try Again Later" });
  }
};
const updateSubject = async (req, res) => {
  const id = req.params.id;
  const data = req.body.subject;
  try {
    const subject = await subjectModel.findByIdAndUpdate(id, data);
    return res.status(201).json(subject);
  } catch (err) {
    return res
      .status(404)
      .json({ msg: "Faild To Add Subject, Please Try Again Later" });
  }
};
const deleteSubject = async (req, res) => {
  const id = req.params.id;
  const data = await subjectModel.findByIdAndDelete(id);
  if (!data) return res.status(404).json({ msg: "No Subject Found" });

  return res.status(200).json({ msg: "Done Deleted" });
};
const addSource = async (req, res) => {
  const data = req.body.subject;
  if (!data || !data.name)
    return res.status(404).json({ msg: "You Should Add Subject Name" });
  try {
    const subject = await subjectModel(data);
    subject.save();
    return res.status(201).json({ msg: "Done Created" });
  } catch (err) {
    return res
      .status(404)
      .json({ msg: "Faild To Add Subject, Please Try Again Later" });
  }
};
const getSource = async (req, res) => {
  const id = req.params.id;
  try {
    const subject = await subjectModel.findById(id);
    return res.status(201).json(subject);
  } catch (err) {
    return res
      .status(404)
      .json({ msg: "Faild To Add Subject, Please Try Again Later" });
  }
};
const updateSource = async (req, res) => {
  const id = req.params.id;
  const data = req.body.subject;
  try {
    const subject = await subjectModel.findByIdAndUpdate(id, data);
    return res.status(201).json(subject);
  } catch (err) {
    return res
      .status(404)
      .json({ msg: "Faild To Add Subject, Please Try Again Later" });
  }
};
const deleteSource = async (req, res) => {
  const id = req.params.id;
  const data = await subjectModel.findByIdAndDelete(id);
  if (!data) return res.status(404).json({ msg: "No Subject Found" });

  return res.status(200).json({ msg: "Done Deleted" });
};

const current = (req, res) => {
  return res.status(200).json({ msg: "current" });
};
module.exports = {
  login,
  addSubject,
  current,
  deleteSubject,
  getSubject,
  updateSubject,
  addSource,
  getSource,
  updateSource,
  deleteSource,
};
