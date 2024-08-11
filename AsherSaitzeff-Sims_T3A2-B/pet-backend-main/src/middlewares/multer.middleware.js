import multer from 'multer';
import fs from 'fs';
import path from 'path';
import os from 'os';


const sanitizeFile = (file, cb) => {
    const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); 
    } else {
        
        const error = new Error("Error: File type not allowed!");
        error.statusCode = 415;
        cb(error);
    }
};



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const tempDir = os.tmpdir();
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        sanitizeFile(file, cb);
    },
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
    },
});