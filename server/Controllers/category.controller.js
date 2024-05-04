const cloudinary = require("cloudinary").v2;
const path = require("path");
const ProductModel = require("../Models/Product.model");
const { StatusCodes } = require("http-status-codes");
const CategoryModel = require("../Models/Category.model");
const CustomError = require("../errors");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const createCategory = async (req, res) => {
  const { name, slug } = req.body;

  if (!name || !slug) {
    throw new CustomError.BadRequestError("Name and slug are required");
  }

  if (!req.files.image) {
    throw new CustomError.BadRequestError("Image is required");
  }
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        folder: "category_images",
        use_filename: true,
      }
    );

    const newCategory = await CategoryModel.create({
      name,
      slug,
      image: cloudinaryResponse.url,
      owner: req.user.userId,
      public_id: cloudinaryResponse.public_id,
    });

    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(StatusCodes.CREATED).json(newCategory);
  } catch (error) {
    throw new CustomError.BadRequestError("Failed to upload image");
  }
};

const updateNameCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const { name, slug } = req.body;
  let queryObject = {
    owner: req.user.userId,
    _id: categoryId,
  };
  if (!name || !slug) {
    throw new CustomError.BadRequestError("Name and slug are required");
  }
  let category = await CategoryModel.findOne(queryObject);
  console.log(category);
  category.name = name;
  category.slug = slug;
  await category.save();
  return res.status(StatusCodes.ACCEPTED).json(category);
};
const updateImageCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  let queryObject = {
    owner: req.user.userId,
    _id: categoryId,
  };
  console.log(queryObject);
  if (!req.files.image) {
    throw new CustomError.BadRequestError("Image is required");
  }
  let category = await CategoryModel.findOne(queryObject);
  console.log(category);
  if (!category) {
    throw new CustomError.NotFoundError("Product not found");
  }
  let imageUrl;
  if (req.files.image) {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        folder: "category_images",
        use_filename: true,
      }
    );
    imageUrl = cloudinaryResponse.url;
    // Delete old image if it exists
    if (category.image) {
      await cloudinary.uploader.destroy(category.public_id);
    }
  }
  if (imageUrl) {
    category.image = imageUrl;
  }
  await category.save();
  return res.status(StatusCodes.ACCEPTED).json(category);
};

const getAllCategory = async (req, res) => {
  const { name, slug } = req.query;
  let queryObject = {
    owner: req.user.userId,
  };
  if (name) queryObject.name = new RegExp(name, "i");
  if (slug) queryObject.slug = new RegExp(slug, "i");

  let category = await CategoryModel.find(queryObject);
  return res.status(StatusCodes.ACCEPTED).json(category);
};
const getSingleCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  let queryObject = {
    owner: req.user.userId,
    _id: categoryId,
  };
  let category = await CategoryModel.findOne(queryObject);
  if (!category)
    throw new CustomError.NotFoundError(`No category with id: ${categoryId}`);

  return res.status(StatusCodes.OK).json(category);
};

const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  let queryObject = {
    owner: req.user.userId,
    _id: categoryId,
  };
  let category = await CategoryModel.findOneAndDelete(queryObject);
  let deleteProduct = await ProductModel.deleteMany({
    category: categoryId,
    owner: req.user.userId,
  });
  console.log(deleteProduct);
  if (!category)
    throw new CustomError.NotFoundError(`No category with id: ${categoryId}`);

  if (category.image) {
    await cloudinary.uploader.destroy(category.public_id);
  }

  return res.status(StatusCodes.OK).json(category);
};
module.exports = {
  getAllCategory,
  createCategory,
  updateNameCategory,
  updateImageCategory,
  deleteCategory,
  getSingleCategory,
};
