const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Categorias',
    allowed_formats: ['jpg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }]
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

module.exports = upload;
