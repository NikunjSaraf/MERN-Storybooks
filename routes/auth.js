const express = require("express");
const { check } = require("express-validator");
const { signin, signout, signup } = require("../controllers/auth");
const router = express.Router();

router.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }),
    check("email").isEmail().withMessage("Please Enter Proper Email Id"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Please Enter Password of Length 6"),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Please Enter Proper Email Id"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Please Enter Password of Length 6"),
  ],
  signin
);
router.get("/signout", signout);

module.exports = router;
