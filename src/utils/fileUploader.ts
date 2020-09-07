import { Storage } from '@google-cloud/storage';
import * as path from 'path';

const storage = new Storage({
  projectId: 'test-d02ef',
  keyFilename: path.join(
    __dirname,
    '../assets/firebase_config/test-d02ef.json'
  ),
});
const bucket = storage.bucket('gs://test-d02ef.appspot.com');

interface file {
  folder: string;
  originalName: string;
  mimeType: string;
  buffer: string;
}

export const uploadFile = (file: file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('NO_FILE');
    }

    const newFileName =
      'activities/' + new Date().toISOString() + file.originalName;
    const fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimeType,
      },
      public: true,
    });
    blobStream.on('error', (error) => {
      console.log(error);
    });

    blobStream.on('finish', () => {
      fileUpload.makePublic().then(() => {
        const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        console.log(url);
        resolve(url);
      });
      // The public URL can be used to directly access the file via HTTP.
    });

    blobStream.end(new Buffer(file.buffer, 'base64'));
  });
};
