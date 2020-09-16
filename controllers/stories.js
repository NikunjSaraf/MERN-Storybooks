const Stories = require("../models/stories");

exports.getStoryById = (req, res, next, id) => {
  Stories.findById(id)
    .populate("user", "_id name")
    .exec((err, story) => {
      if (err || !story) {
        return res.status(400).json({
          error: "No Story Found",
        });
      }
      req.story = story;
      next();
    });
};

exports.createStory = (req, res) => {
  req.body.user = req.profile.id;
  const story = new Stories(req.body);
  story.save((err, story) => {
    if (err || !story) {
      return res.status(400).json({
        error: "Unable to save to db",
      });
    }
    return res.json(story);
  });
};

exports.getStory = (req, res) => {
  return res.json(req.story);
};

exports.getPublicStories = (req, res) => {
  Stories.find({ status: "Public" })
    .populate("user", "_id name")
    .exec((err, story) => {
      if (err || !story) {
        return res.status(400).json({
          error: "No stories found",
        });
      }
      res.json(story);
    });
};

exports.updateStory = (req, res) => {
  Stories.findByIdAndUpdate(
    { _id: req.story._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, story) => {
      if (err || !story) {
        return res.status(400).json({
          error: "Failed to update story",
        });
      }
      return res.json(story);
    }
  );
};

exports.deleteStory = (req, res) => {
  let story = req.story;
  story.remove((err, story) => {
    if (err || !story) {
      return res.status(400).json({
        error: "Failed to delete the story",
      });
    }
    return res.json({
      message: "Story deleted Successfully",
      story,
    });
  });
};
