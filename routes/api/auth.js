const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  currentUser,
  confirm,
  resend,
} = require("../../controllers");
const { schemaRegister, schemaLogin } = require("../../models/user");
const { validateRequest } = require("../../middlewares/validateRequest");
const { auth } = require("../../middlewares/auth");

router.post("/signup", validateRequest(schemaRegister), register);
router.post("/login", validateRequest(schemaLogin), login);
router.post("/logout", auth, logout);
router.get("/current", auth, currentUser);
router.get("/verify/:verificationToken", confirm);
router.post("/verify", resend);

module.exports = router;
