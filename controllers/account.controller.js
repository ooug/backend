// eslint-disable-next-line no-unused-vars
import e from 'express'

/**
 * user
 * @param {e.Request} _req
 * @param {e.Response} res
 */
export const user = async (_req, res) => {
  res.status(200).send({ name: 'santosh' })
}
