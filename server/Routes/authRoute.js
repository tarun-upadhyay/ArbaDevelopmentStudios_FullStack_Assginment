const express = require("express");
const {
  register,
  login,
  updateProfileFullName,
  updateProfilePassword,
  logout,profile,
  updateProfileImage,
} = require("../Controllers/auth.controller");
const { authenticateUser } = require("../middleware/authentication");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.patch("/updateName", authenticateUser, updateProfileFullName);
router.get("/profile", authenticateUser, profile);
router.patch("/updatePassword", authenticateUser, updateProfilePassword);
router.route("/updateImage").post(authenticateUser, updateProfileImage);
module.exports = router;
