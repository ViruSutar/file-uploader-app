const express = require("express");
const router = express.Router();
const { uploadFile,getUserFiles,downloadFile} =require('../Controllers/FilesController')
const multer = require('multer')
const {isLoggedIn} = require('../middleware/auth')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "files");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
  });


const upload = multer({storage:multerStorage, dest: "public/files" });

router.post('/upload',isLoggedIn,upload.single('myFile'),uploadFile)
router.get('/getFiles',isLoggedIn,getUserFiles)
router.get('/download',isLoggedIn,downloadFile)

module.exports = router;
