require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { validationResult } = require("express-validator");

//Signup controller
exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found",
      });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  });
};

//Signin Controller
exports.signin = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User does not exists",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "User email and password does not match",
      });
    }

    // Generate web token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // Put user token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //Send data to frontend
    const { _id, name, email } = user;
    res.json({ token, user: { _id, name, email } });
  });
};

// Signout Controller
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User Signout" });
};

// Custom middlewares and protected routes
exports.isSigned = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
