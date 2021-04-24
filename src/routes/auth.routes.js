import e from 'express'
import { login, resetPassword, sendOtp, signup } from '../controllers/index.js'

/**
 * @type {e.RouterOptions}
 */
const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false
}

const $ = e.Router(options)

$.post('/signup', signup)
$.post('/login', login)
$.post('/send-otp', sendOtp)
$.post('/reset-password', resetPassword)

export default $
