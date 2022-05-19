const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../controllers/auth.js");
const {
  userProfile,
  updateProfile,
  deleteProfile,
  getUserCount,
  allUsers,
  updateProfileByAdmin,
} = require("../controllers/user.js");

router
  .route("/profile")
  .get(isAuth, userProfile)
  .put(isAuth, updateProfile)
  .delete(isAuth, deleteProfile);

router.route("/count").get(isAuth, isAdmin, getUserCount);
router.route("/users").get(isAuth, isAdmin, allUsers);
router.route("/users/:id").put(isAuth, isAdmin, updateProfileByAdmin);

module.exports = router;
