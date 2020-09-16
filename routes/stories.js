const express = require("express");
const {
  getStoryById,
  createStory,
  getStory,
  getPublicStories,
  updateStory,
  deleteStory,
} = require("../controllers/stories");
const { isSigned, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

const router = express.Router();
router.param("storyId", getStoryById);
router.param("userId", getUserById);

router.post("/stories/create/:userId", isSigned, isAuthenticated, createStory);
router.get("/story/:storyId", getStory);
router.get("/stories/public", getPublicStories);
router.put(
  "/story/update/:storyId/:userId",
  isSigned,
  isAuthenticated,
  updateStory
);
router.delete(
  "/story/delete/:storyId/:userId",
  isSigned,
  isAuthenticated,
  deleteStory
);

module.exports = router;
