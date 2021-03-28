// eslint-disable-next-line no-unused-vars
import e from 'express'

/**
 * text Content Type Middleware
 * @function
 * @name textContentTypeMiddleware
 * @param {e.Request} _req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
export const textContentTypeMiddleware = async (_req, res, next) => {
  res.setHeader('Content-Type', 'text/plain')
  next()
}
