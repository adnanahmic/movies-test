module.exports = () => {
  return function fileUpload(req, res, next) {
    if (req.file)
      req.body.cover = req.file.path
    next();
  };
};
