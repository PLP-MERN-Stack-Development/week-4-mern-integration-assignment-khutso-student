const multer = require('multer');
const path = require('path');

// Set where and how files will be saved
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in "uploads" folder
  },
  filename: (req, file, cb) => {
    // Use current timestamp + original file extension as filename
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isAllowedExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isAllowedMime = allowedTypes.test(file.mimetype);

  if (isAllowedExt && isAllowedMime) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Export multer middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
