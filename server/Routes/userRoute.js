const express = require("express");
const router = express();
const passport = require("passport");
const userController = require("../Controllers/user.controller");
require("../passport");
router.use(passport.initialize());
router.use(passport.session());

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  async (req, res) => {
    console.log(res.user.email,req, "udsuf");
  }
);


module.exports = router;
