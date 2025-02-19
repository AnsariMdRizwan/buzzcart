const cloudinary = require('cloudinary').v2;

const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = new multer.memoryStorage();
const upload = multer({ storage });

const imageUploadutils = async (file) => {
    console.log(file);
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',

    })
    return result;
}




module.exports = { upload, imageUploadutils };