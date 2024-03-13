const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file, callback) => {
        callback(null, path.join(__dirname,'../../../public/assets/upload'))
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}_user${path.extname(file.originalname)}}`);
    }
});

const uploadImgUser = multer({ storage });

module.exports = uploadImgUser;