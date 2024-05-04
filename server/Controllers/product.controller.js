const cloudinary = require("cloudinary").v2;
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const fs = require("fs");
const ProductModel = require("../Models/Product.model");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const createProduct = async (req, res) => {
  const { title, description, price, category } = req.body;

  if (!title || !description || !price || !category) {
    throw new CustomError.BadRequestError(
      "Title, Description, price and category are required"
    );
  }

  if (!req.files) {
    throw new CustomError.BadRequestError("Image is required");
  }
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        folder: "product_images",
        use_filename: true,
      }
    );

    const newProduct = await ProductModel.create({
      title,
      description,
      price,
      category,
      image: cloudinaryResponse.url,
      owner: req.user.userId,
      public_id: cloudinaryResponse.public_id,
    });

    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(StatusCodes.CREATED).json(newProduct);
  } catch (error) {
    throw new CustomError.BadRequestError("Failed to upload image");
  }
};

const updateNameProduct = async (req, res) => {
  const { id: productId } = req.params;
  console.log(productId);
  const { category, title, description, price } = req.body;
  let queryObject = {};
  if (category) queryObject.category = category;
  if (title) queryObject.title = title;
  if (description) queryObject.description = description;
  if (price) queryObject.price = price;
  console.log(queryObject);
  const updateProduct = await ProductModel.findByIdAndUpdate(
    { _id: productId },
    queryObject,
    { runValidators: true }
  );
  if (!updateProduct)
    throw new CustomError.BadRequestError(
      `Not found any product with this id: ${productId}`
    );
  return res.status(StatusCodes.OK).json(updateProduct);
};

const updateImageProduct = async (req, res) => {
  const { id: productId } = req.params;
  if (!req.files.image) {
    throw new CustomError.BadRequestError("Image is required");
  }
  let product = await ProductModel.findById(productId);

  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }
  let imageUrl;
  if (req.files.image) {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        folder: "product_images",
        use_filename: true,
      }
    );
    imageUrl = cloudinaryResponse.url;
    // Delete old image if it exists
    if (product.image) {
      await cloudinary.uploader.destroy(product.public_id);
    }
  }
  if (imageUrl) {
    product.image = imageUrl;
  }
  await product.save();
  return res.status(StatusCodes.ACCEPTED).json(product);
};

const getProducts = async (req, res) => {
  const { title, price, category, limit } = req.query;
  console.log(req.user.userId);
  let queryObject = {
    owner: req.user.userId,
  };
  if (title) queryObject.title = new RegExp(title, "i");
  if (category) queryObject.category = new RegExp(category, "i");

  let sortOption = {};
  if (price === "asc") {
    sortOption.price = 1;
  } else if (price === "desc") {
    sortOption.price = -1;
  }

  let products = await ProductModel.find(queryObject)
    .populate("category", "name")
    .sort(sortOption)
    .limit(limit);

  return res.status(StatusCodes.ACCEPTED).json(products);
};
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  let product = await ProductModel.findByIdAndDelete(productId);

  if (!product)
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);

  if (product.image) {
    await cloudinary.uploader.destroy(product.public_id);
  }

  return res.status(StatusCodes.OK).json(product);
};
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  let product = await ProductModel.findById(productId);
  if (!product)
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);

  return res.status(StatusCodes.OK).json(product);
};
module.exports = {
  createProduct,
  updateNameProduct,
  updateImageProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
};
