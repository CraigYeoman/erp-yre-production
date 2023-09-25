const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const user = require("../models/user");
const BadRequestError = require("../errors/index").BadRequestError;
const UnAuthenticatedError = require("../errors/index").UnAuthenticatedError;
const connectDB = require("../db/connect");
const mongoose = require("mongoose");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const userAlreadyExits = await User.findOne({ email });

  if (userAlreadyExits) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.CREATED).json({
    user,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("please provide all values");
  }

  if (email === "yeomanraceengines@gmail.com") {
    mongoose.disconnect(process.env.MONGO_URI);
    try {
      await connectDB(process.env.MONGO_URI_PRODUCTION);
    } catch (error) {
      console.log(error);
    }
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: { email: user.email, name: user.name },
    token,
  });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!email || !name) {
    throw new BadRequestError("please provide all values");
  }

  const user = await User.findOneAndDelete({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: { email: user.email, name: user.name },
    token,
  });
};

const getCurrentUser = async (req, res) => {
  res.send("getCurrentUser");
};

const logout = async (req, res) => {
  mongoose.disconnect();

  try {
    await connectDB(process.env.MONGO_URI, { useNewUrlParser: true });
  } catch (error) {
    console.log(error);
  }
  res.status(StatusCodes.OK).json("logout complete");
};

module.exports = { register, login, updateUser, getCurrentUser, logout };
