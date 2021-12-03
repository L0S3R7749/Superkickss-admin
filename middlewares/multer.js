const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({
    filename: function (req, file, cb) {
      console.log("Naming file...");
      cb(null, file.fieldname + "-" + Date.now());
    }
  }),
  fileFilter: (req, file, cb) => {
    console.log("Filtering...");
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
