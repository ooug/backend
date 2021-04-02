export * from './file-uploader.util'
export * from './mailer.util'
export * from './send-otp.util'
export * from './constant.util'

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
