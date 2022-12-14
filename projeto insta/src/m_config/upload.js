const multer = require("multer");
const path = require("path");

exports.upload = (folder) => {
  return {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, "..", "..", folder),
      filename: (req, file, cb) => {
        const fileName = `${file.fieldname} - ${Date.now()}.${file.mimetype.split("/")[1]}`;
        return cb(null, fileName);
      },
    }),
  };
};