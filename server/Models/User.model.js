const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide fullName"],
    minlength: 3,
    maxlength: 50,
  },
  userName: {
    type: String,
    required: [true, "Please provide userName"],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password."],
    minlength: 6,
  },
  avatar: {
    type: String,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  try {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = mongoose.model("User", UserSchema);
