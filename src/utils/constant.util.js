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

/**
 * @typedef FIREBASE
 * @type {object}
 * @property {string} type
 */
export const FIREBASE = {
  type: env.FIREBASE_TYPE || '',
  project_id: env.FIREBASE_PROJECT_ID || '',
  private_key_id: env.FIREBASE_PRIVATE_KEY_ID || '',
  private_key: env.FIREBASE_PRIVATE_KEY || '',
  client_email: env.FIREBASE_CLIENT_EMAIL || '',
  client_id: env.FIREBASE_CLIENT_ID || '',
  auth_uri: env.FIREBASE_AUTH_URI || '',
  token_uri: env.FIREBASE_TOKEN_URI || '',
  auth_provider_x509_cert_url: env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || '',
  client_x509_cert_url: env.FIREBASE_CLIENT_X509_CERT_URL || ''
}
