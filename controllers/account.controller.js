// eslint-disable-next-line no-unused-vars
const e = require('express')

/**
 * user
 * @param {e.Request} _req
 * @param {e.Response} res
 */
exports.user = async (_req, res) => {
  res.status(200).send({ name: 'santosh' })
}
