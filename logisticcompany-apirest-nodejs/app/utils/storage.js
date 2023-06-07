const multer = require("multer");
const sharp  = require("sharp");

/**
 * @param filePath {Root file}
 * @param size     {Size file}
 */
const helperImg = (filePath, fileName, size = 300) => {
    return sharp(filePath).resize(size).toFile(`./app/src/files/img/optimize/halconbit-${fileName}`);
};

/**
 * Upload File
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './app/src/files/img/uploads'); // TODO:    
    },
    filename: (req, file, cb) => {
        console.log(file);
        const ext = file.originalname.split(".").pop();
        cb(null, `halcon-bit${Date.now()}.${ext}`);
    }
});

/**
 * Middleware
 */
const upload = multer({ storage });

module.exports = { storage, helperImg, upload };