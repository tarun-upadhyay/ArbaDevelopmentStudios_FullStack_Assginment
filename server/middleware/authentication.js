const CustomError = require("../errors");
const { isTokenValid } = require("../Utils");

const authenticateUser = async (req, res, next) => {
  // console.log(req);
  const token = req.signedCookies.authToken;

  if (!token)
    throw new CustomError.UnauthenticatedError("Authentication Invaild");

  try {
    const { fullName, userId } = isTokenValid({ token });
    req.user = { fullName, userId};

    next();
  } catch (error) {
    console.log(error);
    throw new CustomError.UnauthenticatedError("Authentication Invaild");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    // console.log(roles, req.user.role);
    if (!roles.includes(req.user.role))
      throw new CustomError.UnauthorizedError(
        "Unauthrized to access this route"
      );
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
