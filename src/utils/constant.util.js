import { env } from 'process'

/**
 * @type {string}
 */
export const NAME = env.NAME || ''
/**
 * @type {string}
 */
export const MAIN_WEB_URL = env.MAIN_WEB_URL || ''
/**
 * @type {string}
 */
export const ADMIN_WEB_URL = env.ADMIN_WEB_URL || ''
/**
 * @type {string}
 */
export const DB_URL = env.DB_URL || ''

/**
 * @type {string}
 */
export const EMAIL_HOST = env.EMAIL_HOST || ''
/**
 * @type {number}
 */
export const EMAIL_PORT = +(env.EMAIL_PORT || '0')
/**
 * @type {string}
 */
export const EMAIL_USER = env.EMAIL_USER || ''
/**
 * @type {string}
 */
export const EMAIL_PASSWORD = env.EMAIL_PASSWORD || ''
