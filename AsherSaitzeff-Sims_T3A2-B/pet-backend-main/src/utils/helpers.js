import fs from "fs";
import mongoose from "mongoose";

export const removeLocalFile = (localPath) => {
    fs.unlink(localPath, (err) => {
        if (err) console.log("Error while removing local files: ", err);
        else {
            console.log("Removed local: ", localPath);
        }
    });
};

export const removeUnusedMulterImageFilesOnError = (req) => {
    try {
        const multerFile = req.file;
        const multerFiles = req.files;

        if (multerFile && fs.existsSync(multerFile?.path)) {
           
            removeLocalFile(multerFile.path);
        }

        if (multerFiles) {
            
            const filesValueArray = Object.values(multerFiles);
           
            filesValueArray.map((fileFields) => {
                fileFields.map((fileObject) => {
                    removeLocalFile(fileObject.path);
                });
            });
        }
    } catch (error) {
        console.log("Error while removing image files: ", error);
    }
};


export const getMongoosePaginationOptions = ({
    page = 1,
    limit = 10,
    customLabels,
}) => {
    return {
        page: Math.max(isNaN(parseInt(page)) ? 1 : page, 1),
        limit: Math.max(limit, 1),
        pagination: true,
        customLabels: {
            pagingCounter: "serialNumberStartFrom",
            ...customLabels,
        },
    };
};