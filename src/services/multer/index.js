import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3 } from '../aws';

export const uploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function ({ user }, file, cb) {
      cb(null, 'avatars/' + user._id + '/' + Date.now().toString());
    }
  })
});
