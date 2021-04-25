const mailer = require('./mailer.service')
const sms = require('./sms.service')

module.exports = { ...mailer, ...sms }
