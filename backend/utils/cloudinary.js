const dotenv = require("dotenv")
const cloudinaryModule = require("cloudinary");

dotenv.config()
const cloudinary = cloudinaryModule.v2

cloudinary.config({
    cloud_name: procress.env.CLOUDINARY_NAME,
    api_key: procress.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports = cloudinary;
