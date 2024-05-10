const userModel = require("../models/user.model");

const verifyUser = async (req, res, next) => {
  const id = req.current.userId;
  const user = await userModel.findById(id);
  if (user && user.isAdmin) return next();
  else {
    if (user && user.activate && user.activate > Date.now()) return next();
    else {
      const unActive = await userModel.findByIdAndUpdate(id, {
        active: false,
      });
      return res.status(401).json({
        msg: "You Now Is Not Active Please Contact With Admin",
      });
    }
  }
};

module.exports = verifyUser;
