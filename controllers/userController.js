const asyncHandler = require("express-async-handler");
const genaretaToken = require("../config/generateToken");
const User = require("../models/userMode");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Entre all the Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);

    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: genaretaToken(user._id),
    });
  } else {
    res.status(400);
    throw new error("Failed to create the user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      email: user.email,
      pic: user.pic,
      token: genaretaToken(user._id),
    });
  } else {
    res.status(401);
    {
      throw new Error("Invalid Email or password");
    }
  }
});

module.exports = { registerUser, authUser };
