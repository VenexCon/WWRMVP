//@desc Register new User
//@route /users
//@access public
const registerUser = (req, res) => {
  const {name, email, password} = req.body

  if(!name || !email || !password) {
    res.status(400)
    throw new error('Please include all fields')
  } else {
    return res.status(201).send('user Registered')
  }
};


//@desc Login User
//@route //users/login
//@access private
const loginUser = (req, res) => {
  res.send("Login user");
};


//@desc Register new User
//@route /users/me
//@access private
const getMe = (req, res) => {
  res.send('Your profile')
}

module.exports = {
  registerUser,
  loginUser,
  getMe
};
