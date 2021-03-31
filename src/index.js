import { join } from 'path'
import { cwd } from 'process'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
// Imports the Google Cloud client library.
import { Storage } from '@google-cloud/storage'

import router from './routes/index.js'
import { textContentTypeMiddleware } from './middlewares/index.js'

import './middlewares/passport-config.middleware.js'

const { urlencoded, static: serve, json } = express
const { connect } = mongoose

const conf = config()
if (conf.error) throw new Error(conf.error.message)

export const bootstrap = async function () {
  const $ = express()
  const PORT = process.env.PORT || 3000

  // middleware
  $.disable('etag')
  $.disable('x-powered-by')
  $.use(cors())
  $.use(json({ limit: '10mb' }))
  $.use(morgan('dev'))
  $.use(urlencoded({ extended: false }))
  $.use(serve(join(cwd(), 'public')))
  $.use(passport.initialize())

  // custom middleware
  $.use(textContentTypeMiddleware)

  // routing
  $.get('/', async (req, res) => {
    res.status(200).send({
      status: true,
      data: 'thank you sir',
      path: req.path,
      timestamp: Math.trunc(Date.now() / 1000)
    })
  })

  $.all('/ping', async (req, res) => {
    res.status(200).send({
      status: true,
      data: 'pong',
      path: req.path,
      timestamp: Math.trunc(Date.now() / 1000)
    })
  })

  // router
  $.use(router)

  // 404
  $.all('*', async (req, res) => {
    res.status(404).send({
      status: false,
      data: 'page not found',
      path: req.path,
      timestamp: Math.trunc(Date.now() / 1000)
    })
  })

  $.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
  })

  return $
}

connect(process.env.DB_URL || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('DB Connected!')
    bootstrap()
  })
  .catch((err) => {
    console.log('DB Error!')
    console.log(err)
  })

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = new Storage()
// Makes an authenticated API request.
const listBuckets = async () => {
  try {
    const results = await storage.getBuckets()
    const [buckets] = results
    console.log('Buckets:')
    buckets.forEach((bucket) => {
      console.log(bucket.name)
    })
  } catch (err) {
    console.error('ERROR:', err)
  }
}
listBuckets()
