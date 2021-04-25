const e = require('express')
const { login, resetPassword, sendOtp, signup } = require('../controllers')

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

module.exports = $
