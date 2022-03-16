// const { is } = require("express/lib/request");
// const { invalid } = require("joi");
const multer = require("multer");
const uuid = require("uuid");


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
}

const photoUpload = multer({
    limits: 10000000,
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "uploads/images");
        },
        filename: (req, file, callback) => {
            const extension = MIME_TYPE_MAP[file.mimetype];
            callback(null, uuid.v1() + "." + extension);
        }
    }),
    fileFilter: (req, file, callback) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error("Invalid mime type!");
        callback(error, isValid);
    }
})

module.exports = photoUpload
