const cloudinary = require("cloudinary").v2;
const path = require("path");
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

  if (!name || !slug) {
    throw new CustomError.BadRequestError("Name and slug are required");
  }
  let category = await CategoryModel.findById(categoryId);
  console.log(category);
  category.name = name;
  category.slug = slug;
  await category.save();
  return res.status(StatusCodes.ACCEPTED).json(category);
};
const updateImageCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  if (!req.files.image) {
    throw new CustomError.BadRequestError("Image is required");
  }
  let category = await CategoryModel.findById(categoryId);

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
  let queryObject = {};
  if (name) queryObject.name = { $regex: name, $options: "i" };
  if (slug) queryObject.slug = slug;

  let category = await CategoryModel.find(queryObject);
  return res.status(StatusCodes.ACCEPTED).json(category);
};
const getSingleCategory = async (req, res) => {
  const { id: categoryId } = req.params;

  let category = await CategoryModel.findById(categoryId);
  if (!category)
    throw new CustomError.NotFoundError(`No category with id: ${categoryId}`);

  return res.status(StatusCodes.OK).json(category);
};

const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  let category = await CategoryModel.findByIdAndDelete(categoryId);

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
