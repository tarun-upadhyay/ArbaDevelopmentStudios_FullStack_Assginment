const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../Models/User.model");
const { attachCookiesToResponse } = require("../Utils");

const register = async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  //All validation done by MongoDB Schema with proper message that's not wrote indivaully

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists)
    throw new CustomError.BadRequestError("Email already exist");

  const user = await User.create({ fullName, userName, email, password });

  const tokenUser = { fullName: user.fullName, userId: user._id };

  attachCookiesToResponse({ res, user: tokenUser });
  return res
    .status(StatusCodes.OK)
    .json({ user: tokenUser, msg: "User Created Successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) throw new CustomError.UnauthenticatedError("Invalid Credentials");

  const isPassword = await user.comparePassword(password);

  if (!isPassword)
    throw new CustomError.UnauthenticatedError("Invalid credentials");

  const tokenUser = { fullName: user.fullName, userId: user._id };

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
module.exports = {
  register,
  login,
  updateProfileFullName,
  updateProfilePassword,
};

          
