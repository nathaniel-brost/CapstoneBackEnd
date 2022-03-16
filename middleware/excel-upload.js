// const { is } = require("express/lib/request");
// const { invalid } = require("joi");
const multer = require("multer");
const uuid = require("uuid");


const MIME_TYPE_MAP = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12": "xlsb",
    "application/vnd.ms-excel": "xls",
    "application/vnd.ms-excel.sheet.macroEnabled.12": "xlsm"
}

const excelUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "uploads/items");
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

module.exports = excelUpload
