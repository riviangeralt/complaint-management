const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../controllers/auth.js");
const {
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/category.js");

router.route("/create/category").post(isAuth, isAdmin, createCategory);
router
  .route("/category/:id")
  .put(isAuth, isAdmin, updateCategory)
  .delete(isAuth, isAdmin, deleteCategory);
router.route("/category").get(isAuth, getCategory);

module.exports = router;
