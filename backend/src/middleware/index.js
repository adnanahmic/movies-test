const fileUpload = require('./file-upload');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({
  storage
});

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.use('/movies', upload.single('cover'), fileUpload(app));
};
