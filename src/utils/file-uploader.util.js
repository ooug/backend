import { join } from 'path'
import { cwd } from 'process'
import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: 'test-d02ef',
  keyFilename: join(cwd(), '../assets/firebase_config/test-d02ef.json')
})
const bucket = storage.bucket('gs://test-d02ef.appspot.com')

/**
 * uploadFile
 * @function
 * @name uploadFile
 * @param {{folder: string, originalName: string, mimeType: string, buffer: string;}} file file
 * @returns {Promise<*>}
 */
export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('NO_FILE'))
    }

    const newFileName =
      file.folder + new Date().toISOString() + file.originalName
    const fileUpload = bucket.file(newFileName)

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimeType
      },
      public: true
    })
    blobStream.on('error', (error) => {
      console.log(error)
    })

    blobStream.on('finish', () => {
      fileUpload.makePublic().then(() => {
        const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
        console.log(url)
        resolve(url)
      })
      // The public URL can be used to directly access the file via HTTP.
    })

    blobStream.end(Buffer.from(file.buffer, 'base64'))
  })
}
