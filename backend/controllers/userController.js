const registerUser = (req, res) => {
  res.send("register user");
};
const loginUser = (req, res) => {
  res.send("Login user");
};

module.exports = {
  registerUser,
  loginUser,
};
