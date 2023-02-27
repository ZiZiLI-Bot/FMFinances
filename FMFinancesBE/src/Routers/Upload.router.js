import express from 'express';
import multer from 'multer';
import path from 'path';

import UploadController from '../Controllers/Upload.controller';

const UploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(global.__basedir, '../public/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

UploadRouter.post('/uploads', upload.array('files'), UploadController.uploadMultipleFiles);

export default UploadRouter;
