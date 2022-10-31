const Jimp = require("jimp");


const resizeImage = (req, res, next) => {
  const { path } = req.file;
  Jimp.read(path)
    .then((image) => {
      image.resize(250, 250);
      image.write(path);
      next();
    })
    .catch((error) => next(error));
};

module.exports = resizeImage;