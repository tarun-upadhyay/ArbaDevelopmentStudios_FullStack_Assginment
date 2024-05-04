const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../Models/User.model");
const { attachCookiesToResponse } = require("../Utils");
const cloudinary = require("cloudinary").v2;
const UserModel = require("../Models/User.model");
const ProductModel = require("../Models/Product.model");
const CategoryModel = require("../Models/Category.model");
const {
  createDummyCategory,
  attachDummyDataForAllNewUser,
} = require("../Utils/attachDummyData");
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
const register = async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  //All validation done by MongoDB Schema with proper message that's not wrote indivaully

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists)
    throw new CustomError.BadRequestError("Email already exist");
  let avatar =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg";
  const user = await User.create({
    fullName,
    userName,
    email,
    password,
    avatar,
  });

  const addNewCategory = await CategoryModel.insertMany(
    createDummyCategory(user._id)
  );

  const addNewProduct = await ProductModel.insertMany(
    attachDummyDataForAllNewUser(user._id, addNewCategory)
  );
  const tokenUser = {
    fullName: user.fullName,
    userId: user._id,
    avatar: user.avatar,
    email: user.email,
  };

  attachCookiesToResponse({ res, user: tokenUser });
  return res
    .status(StatusCodes.OK)
    .json({ user: tokenUser, msg: "User Created Successfully" });
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new CustomError.BadRequestError(
      "Please provide userName and password"
    );
  }
  console.log(userName);
  const user = await User.findOne({ userName });
  console.log(user);
  if (!user) throw new CustomError.UnauthenticatedError("Invalid Credentials");

  const isPassword = await user.comparePassword(password);

  if (!isPassword)
    throw new CustomError.UnauthenticatedError("Invalid credentials");

  const tokenUser = {
    fullName: user.fullName,
    userId: user._id,
    avatar: user.avatar,
    email: user.email,
  };
  console.log(tokenUser);
  attachCookiesToResponse({ res, user: tokenUser });

  return res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateProfileFullName = async (req, res) => {
  const { fullName } = req.body;
  const userId = req.user.userId;
  if (!fullName)
    throw new CustomError.BadRequestError("Please provide the full Name");

  const user = await User.findByIdAndUpdate(
    userId,
    { fullName },
    { runValidators: true }
  );

  return res
    .status(StatusCodes.OK)
    .json({ msg: "User Name Updated successfull", user });
};

const updateProfilePassword = async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword)
    throw new CustomError.BadRequestError("Please provide the new Pasword");
  const user = await User.findOne({ _id: req.user.userId });
  user.password = newPassword;
  await user.save();
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Password updated successfully", user });
};
const profile = async (req, res) => {
  let user = await UserModel.findById(req.user.userId).select("-password");
  if (!user) throw new CustomError.BadRequestError("user not found");
  return res.status(StatusCodes.OK).json(user);
};
const updateProfileImage = async (req, res) => {
  if (!req.files.image) {
    throw new CustomError.BadRequestError("Image is required");
  }

  let user = await UserModel.findById(req.user.userId);

  if (!user) {
    throw new CustomError.NotFoundError("User not found");
  }

  let imageUrl;
  if (req.files.image) {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        folder: "avatar_images",
        use_filename: true,
      }
    );
    imageUrl = cloudinaryResponse.url;
    // Delete old image if it exists
    if (user.avatar) {
      await cloudinary.uploader.destroy(
        user.avatar.split("/").pop().split(".")[0]
      );
    }
  }

  if (imageUrl) {
    user.avatar = imageUrl;
  }

  await user.save();
  return res.status(StatusCodes.ACCEPTED).json(user);
};

const logout = async (req, res) => {
  res.cookie("authToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "User logged out" });
};
module.exports = {
  register,
  login,
  updateProfileFullName,
  updateProfilePassword,
  logout,
  updateProfileImage,
  profile,
};
