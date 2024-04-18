const express = require("express");

const { authenticateUser } = require("../middleware/authentication");
const {
  createCategory,
  updateNameCategory,
  updateImageCategory,
  getAllCategory,
  deleteCategory,
  getSingleCategory,
} = require("../Controllers/category.controller");
const router = express.Router();

router
  .route("/")
  .post(authenticateUser, createCategory)
  .get(authenticateUser, getAllCategory);
router
  .route("/updateCategoryName/:id")
  .patch(authenticateUser, updateNameCategory);
router
  .route("/updateCategoryImage/:id")
  .patch(authenticateUser, updateImageCategory);

router
  .route("/:id")
  .delete(authenticateUser, deleteCategory)
  .get(authenticateUser, getSingleCategory);
module.exports = router;
