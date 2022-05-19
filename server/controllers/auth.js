const User = require("../models/user");
const jwt = require("jsonwebtoken");

//to check if the user is logged in
exports.isAuth = async (req, res, next) => {
  try {
    if (req.get("Authorization")) {
      const { id } = jwt.verify(
        req.get("Authorization"),
        process.env.JWT_SECRET
      );
      req.user = await User.findById(id);
      if (req.user) {
        next();
      } else {
        return res.status(401).json({
          status: "error",
          message: "Please login to continue",
        });
      }
    } else {
      return res.status(401).json({
        status: "error",
        message: "Invalid token",
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role === 1) {
      next();
    } else {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized. Admin access only",
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
};
