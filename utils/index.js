const fileUpload = require('./file-uploader.util.js')
const mailer = require('./mailer.util.js')
const constant = require('./constant.util.js')

/**
 * @param {*} data
 */
const log = (data) => {
  if (process.env.NODE_ENV !== 'production') console.log(data)
}

/**
 * @param {*} data
 */
const error = (data) => {
  if (process.env.NODE_ENV !== 'production') console.error(data)
}

module.exports = { log, error, ...mailer, ...constant, ...fileUpload }
