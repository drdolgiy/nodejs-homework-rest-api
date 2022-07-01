const createErrors = require("http-errors");
const authServices = require("../services/auth.services");
const emailServices = require("../services/email.services");
const userServices = require("../services/user.services");

const register = async (req, res, next) => {
  try {
    const user = await authServices.registerUser(req.body);
    await emailServices.sendEmail(user.email, user.verificationToken);

    res.status(201).json({
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await authServices.loginUser(req.body);
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authServices.logoutUser(req.user._id);
    res.status(204);
  } catch (error) {
    next(error);
  }
};

const currentUser = (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const confirm = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await userServices.findUser({ verificationToken });
    if (!user) {
      throw createErrors(404, { message: "User not found" });
    }

    await userServices.updateUser(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

const resend = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userServices.findUser({ email });
    if (!user) {
      throw createErrors(404, { message: "User not found" });
    }
    await emailServices.sendEmail(user.email, user.verificationToken);
    return res.status(200).json({
      code: 200,
      message: "Verification email sent",
    });
  } catch (error) {}
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
  confirm,
  resend,
};
