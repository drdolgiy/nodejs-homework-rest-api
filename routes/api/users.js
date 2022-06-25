const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");
const { uploadImage } = require("../../services/image.services");
const { updateUser } = require("../../services/user.services");

router.patch("/avatars", auth, upload.single("avatar"), async (req, res) => {
  console.log("req.file", req.file);

  const { _id: id } = req.user;
  const avatarURL = await uploadImage(id, req.file);
  const user = updateUser(id, { avatarURL });
  res.json(user);
});

module.exports = router;
