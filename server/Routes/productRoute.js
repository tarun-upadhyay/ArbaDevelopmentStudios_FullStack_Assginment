const express = require("express");
const { authenticateUser } = require("../middleware/authentication");
const {
  createProduct,
  updateNameProduct,
  updateImageProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
} = require("../Controllers/product.controller");

const router = express.Router();

router.route("/").post(authenticateUser, createProduct).get(authenticateUser, getProducts);
router
  .route("/updateNameProduct/:id")
  .patch(authenticateUser, updateNameProduct);
router
  .route("/updateImageProduct/:id")
  .patch(authenticateUser, updateImageProduct);

  router
  .route("/:id")
  .delete(authenticateUser, deleteProduct)
  .get(authenticateUser, getSingleProduct);
module.exports = router;
