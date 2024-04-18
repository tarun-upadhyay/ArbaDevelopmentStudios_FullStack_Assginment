const express = require("express");
const {
  register,
  login,
  updateProfileFullName,
  updateProfilePassword,
} = require("../Controllers/auth.controller");
const { authenticateUser } = require("../middleware/authentication");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/updateName", authenticateUser, updateProfileFullName);
router.patch("/updatePassword", authenticateUser, updateProfilePassword);

module.exports = router;
