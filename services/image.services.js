const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;
const { AVATARS, PUBLIC_DIR } = require("../helpers/consts");

const uploadImage = (id, file) => {
  try {
    const avatarURL = path.join(
      AVATARS,
      `${id}${path.extname(file.originalname)}`
    );
    Jimp.read(file.path, (err, lenna) => {
      if (err) throw err;
      lenna.resize(250, 250).write(path.join(PUBLIC_DIR, avatarURL));
    });
    return avatarURL;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    fs.unlink(file.path);
  }
};

module.exports = {
  uploadImage,
};
