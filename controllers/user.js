const User = require("../models/user");
const Stories = require("../models/stories");

// Middleware
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No User found",
      });
    }
    req.profile = user;
    next();
  });
};

// get user details
exports.getUserDetails = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

// get user's stories
exports.getUsersStories = (req, res) => {
  Stories.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, story) => {
      if (err || !story) {
        return res.status(400).json({
          error: "No stories Found",
        });
      }
      return res.json(story);
    });
};
