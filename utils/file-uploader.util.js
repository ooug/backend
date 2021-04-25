const { Storage } = require('@google-cloud/storage')

const storage = new Storage()
const bucket = storage.bucket('gs://test-d02ef.appspot.com')

/**
 * uploadFile
 * @function
 * @name uploadFile
 * @param {{folder: string, originalName: string, mimeType: string, buffer: string;}} file file
 * @returns {Promise<*>}
 */
const uploadFile = (file) => {
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

module.exports = { uploadFile }
