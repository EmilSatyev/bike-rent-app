const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/update-profile").patch(protect, updateUserProfile);

module.exports = router;
