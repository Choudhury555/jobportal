import multer from "multer"

const storage = multer.memoryStorage();

export const singleUpload = multer({storage}).single("file");//this name must be same as per code