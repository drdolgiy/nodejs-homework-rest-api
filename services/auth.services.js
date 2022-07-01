const { User } = require("../models/user");
const createError = require("http-errors");
const { SECRET_KEY } = require("../helpers/env");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  const result = await User.findOne({ email: userData.email });
  if (result) {
    throw createError(409, { message: "Email in use" });
  }

  const password = userData.password;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    ...userData,
    password: hashPassword,
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (user && !user.verify) {
    throw createError(401, "Please confirm your email");
  }
  if (!user) {
    throw createError(401, "Login or password is wrong!");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw createError(401, "Login or password is wrong!");
  }

  const payload = {
    id: user._id,
    subscription: user.subscription,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  return { token };
};

const logoutUser = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

const authUser = async (token) => {
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    return await User.findById(id);
  } catch (error) {
    return null;
  }
};

module.exports = {
  registerUser,
  loginUser,
  authUser,
  logoutUser,
};
