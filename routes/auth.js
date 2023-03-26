const express = require("express");
const { protect } = require("../middleware/auth");

const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
  confirmEmail,
} = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.get("/confirmemail", confirmEmail);
router.put("/updatepassword", protect, updatePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
