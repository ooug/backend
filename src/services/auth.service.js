// eslint-disable-next-line no-unused-vars
import e from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { sendOTP, sendMail } from '../utils/index.js'
import { UserModel as User } from '../models/index.js'

/**
 * signing up
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const signup = async (req, res) => {
  const user = new User(req.body)
  user
    .save()
    .then(() => {
      res.status(200).json({
        status: true,
        data: 'SIGNUP_SUCCESSFUL',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        data: 'ERROR_OCCURRED',
        error: err,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * logging in
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const login = async (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    // if any err found
    if (err) {
      return res.status(500).send({
        status: false,
        data: 'ERROR_OCCURRED',
        error: err,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    }

    // if user not found
    if (!user) {
      return res.status(200).send({
        status: false,
        data: info.message,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    }

    // if user found generate jwt
    const payload = {
      name: user.name,
      email: user.email,
      sub: user._id
    }

    const options = {
      expiresIn: 900
    }
    jwt.sign(payload, 'ooug2011', options, (err, token) => {
      if (err) throw err
      res.status(200).send({
        status: true,
        token: token,
        User: {
          name: user.name,
          email: user.email
        }
      })
    })
  })(req, res)
}

/**
 * send OTP to reset password
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const sendOtp = async (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.send({
          status: false,
          message: 'EMAIL_NOT_REGISTERED',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      }
      sendOTP(req.body.email)
        .then((otp) => {
          res.send({
            status: true,
            message: 'EMAIL_SENT',
            otp: otp,
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000)
          })
        })
        .catch((err) => {
          res.send({
            status: false,
            message: 'ERROR_OCCURRED',
            error: err,
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000)
          })
        })
    })
    .catch((err) => {
      res.send({
        status: false,
        message: 'ERROR_OCCURRED',
        error: err,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * reset password based on email
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const resetPassword = async (req, res) => {
  User.findOne({ email: req.body.email }).then(
    /**
     * @param {*} user
     */
    (user) => {
      if (!user) {
        return res.send({
          status: false,
          message: 'EMAIL_NOT_REGISTERED',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      }
      user.password = req.body.newPassword
      user.save().then(() => {
        sendMail(
          req.body.email,
          'Password successfully changed!',
          '',
          'Your password has been successfully changed.<br><br>If it was not you, contact to admin.'
        )
          .then(() => {
            return res.send({
              status: true,
              message: 'PASSWORD_UPDATED',
              mailSent: true,
              path: req.path,
              timestamp: Math.trunc(Date.now() / 1000)
            })
          })
          .catch(() => {
            return res.send({
              status: true,
              message: 'PASSWORD_UPDATED',
              mailSent: false,
              path: req.path,
              timestamp: Math.trunc(Date.now() / 1000)
            })
          })
      })
    }
  )
}
