const { env } = require('process')

/**
 * @type {string}
 */
exports.NAME = env.NAME || ''
/**
 * @type {string}
 */
exports.MAIN_WEB_URL = env.MAIN_WEB_URL || ''
/**
 * @type {string}
 */
exports.ADMIN_WEB_URL = env.ADMIN_WEB_URL || ''
/**
 * @type {string}
 */
exports.DB_URL = env.DB_URL || ''

/**
 * @type {string}
 */
exports.EMAIL_HOST = env.EMAIL_HOST || ''
/**
 * @type {number}
 */
exports.EMAIL_PORT = +(env.EMAIL_PORT || '0')
/**
 * @type {string}
 */
exports.EMAIL_USER = env.EMAIL_USER || ''
/**
 * @type {string}
 */
exports.EMAIL_PASSWORD = env.EMAIL_PASSWORD || ''

/**
 * @type {string}
 */
exports.JWT_SECRETE = env.JWT_SECRETE || ''
/**
 * @type {string}
 */
exports.JWT_EXPIRE_IN = env.JWT_EXPIRE_IN || ''
