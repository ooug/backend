export * from './file-uploader.util.js'
export * from './mailer.util.js'
export * from './send-otp.util.js'
// export * from './constant.util.js'

/**
 * @param {*} data
 */
export const log = (data) => {
  if (process.env.NODE_ENV !== 'production') console.log(data)
}

/**
 * @param {*} data
 */
export const error = (data) => {
  if (process.env.NODE_ENV !== 'production') console.error(data)
}
