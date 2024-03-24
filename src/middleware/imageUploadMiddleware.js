const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, path.join(__dirname,'../../public/assets/upload'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_user${path.extname(file.originalname)}`);
    }
});

const uploadImg = multer({ storage });
module.exports = uploadImg;