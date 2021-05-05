'use strict'
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const router = require('./routes')
const { textContentTypeMiddleware } = require('./middlewares')

require('./middlewares/passport-config.middleware')

mongoose
  .connect(process.env.DB_URL || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB Connected!')
  })
  .catch((err) => {
    console.log('DB Error!')
    console.log(err)
  })

const $ = express()

// middleware
$.disable('etag')
$.disable('x-powered-by')
$.use(cors())
$.use(express.json({ limit: '10mb' }))
$.use(morgan('dev'))
$.use(express.urlencoded({ extended: false }))
$.use(passport.initialize())

// custom middleware
$.use(textContentTypeMiddleware)

// routing
$.get('/', async (req, res) => {
  res.status(200).send({
    message: 'thank you sir',
    data: { path: req.path, timestamp: Math.trunc(Date.now() / 1000) }
  })
})

$.all('/ping', async (req, res) => {
  res.status(200).send({
    message: 'pong',
    data: { path: req.path, timestamp: Math.trunc(Date.now() / 1000) }
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

if (module === require.main) {
  const PORT = process.env.PORT || 8080
  $.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
  })
}

module.exports = $
