const cloudinary = require("cloudinary").v2;

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = {
  multiple: async (req, res, next) => {
    try {
      console.log(req.files);
      let pictureFiles = req.files;
      // check exists
      if (!pictureFiles) 
          return res.status(400).json({ messaga: "No picture attached!"})
      let multiplePicturePromise = pictureFiles.map(async (picture) => {
          return await cloudinary.uploader.upload(picture.path);
      })
      let imageResponses = await Promise.all(multiplePicturePromise);
      res.locals.images = imageResponses; 
      next()
    } catch (err) {
      res.status(500).json({
        message:err.message,
      })
    }
  }
}

const cloudinaryDelete = {
  multiple: async (req, res, next) => {    
    try {
      let uploadedImages = res.locals.images;
      if (!uploadedImages) return res.status(500).json({ message: "No picutre attached!"});
      let multipleDestroyPromise = uploadedImages.map(image => {
        cloudinary.uploader.destroy(image.public_id);
      })      
      let destroyResponses = await Promise.all(multipleDestroyPromise);
      res.locals.images = undefined
      res.status(200).json({
        message: "Destroy completed"
      })
    } catch (err) {
      res.status(500).json({
        message: err.mwssage
      })
    }
  }
}

module.exports = {cloudinaryUpload, cloudinaryDelete};