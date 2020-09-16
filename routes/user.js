const express = require("express");
const {
  getUserById,
  getUserDetails,
  getUsersStories,
} = require("../controllers/user");
const { isSigned, isAuthenticated } = require("../controllers/auth");
const router = express.Router();

router.param("userId", getUserById);

router.get("/user/:userId", isSigned, isAuthenticated, getUserDetails);
router.get("/user/stories/:userId", isSigned, isAuthenticated, getUsersStories);

module.exports = router;
