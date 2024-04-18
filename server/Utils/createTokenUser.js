const createTokenUser = (user) => ({
  name: user.name,
  userId: user._id,
});

module.exports = createTokenUser;
