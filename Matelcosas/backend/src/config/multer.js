const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear la carpeta si no existe
const uploadDir = path.join(__dirname, '../uploads/categorias');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `categoria-${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error('Tipo de archivo no permitido'));
};

module.exports = multer({ storage, fileFilter });
