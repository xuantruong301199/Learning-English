const multer  = require('multer');
const path    = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let pathOrigin = path.resolve(__dirname, '../public/storage/images');
        cb(null, pathOrigin);
    },
    
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage });
  var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'sound', maxCount: 1 }])

  exports.uploadMulter = upload;
  exports.cpUpload = cpUpload;