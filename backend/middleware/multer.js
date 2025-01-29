const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Tentukan direktori untuk menyimpan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads/products';

    // Cek apakah direktori sudah ada, jika tidak buat direktori baru
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });  // Buat direktori jika belum ada
    }

    cb(null, uploadPath);  // Tentukan folder tempat file akan disimpan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Beri nama file unik
  }
});

// Filter file untuk menerima hanya file gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG or PNG images are allowed!'), false);
  }
};

// Inisialisasi multer dengan konfigurasi di atas
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});


module.exports = {
   upload,
   fileFilter
  };
