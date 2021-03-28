// eslint-disable-next-line no-unused-vars
import e from 'express'

import { UpcomingEventModel } from '../models/index.js'

/**
 * add upcoming event
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const addUpcomingEvent = async (req, res) => {
  const newEvent = new UpcomingEventModel(req.body)
  newEvent
    .save()
    .then(() => {
      res.send({
        status: true,
        data: 'EVENT_CREATED',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
    .catch((_err) => {
      res.send({
        status: false,
        data: 'EVENT_NOT_CREATED',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * get all upcoming event
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const getAllUpcomingEvent = async (req, res) => {
  UpcomingEventModel.find()
    .select('-Registrations')
    .then((events) => {
      res.send({
        status: true,
        data: events,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
    .catch((err) => {
      if (err) throw err
      res.send({
        status: false,
        data: 'SOMETHING_WENT_WRONG',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * get one upcoming event
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const getOneUpcomingEvent = async (req, res) => {
  UpcomingEventModel.findById(req.params.id)
    .select('-Registrations')
    .then((event) => {
      if (event) {
        res.send({
          status: true,
          data: event,
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      } else {
        res.send({
          status: false,
          data: 'EVENT_NOT_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      }
    })
    .catch((_err) => {
      res.send({
        status: false,
        data: 'EVENT_NOT_FOUND',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * delete one upcoming event
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const deleteOneUpcomingEvent = async (req, res) => {
  UpcomingEventModel.findByIdAndDelete(req.body.id)
    .then((event) => {
      if (event) {
        res.send({
          status: true,
          data: 'EVENT_DELETED',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      } else {
        res.send({
          status: false,
          data: 'EVENT_NOT_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      }
    })
    .catch(() => {
      res.send({
        status: false,
        data: 'EVENT_NOT_FOUND',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * register for an event
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const registerForEvent = async (req, res) => {
  UpcomingEventModel.findById(req.body.id)
    .then(
      /**
       * @param {*} event
       */
      (event) => {
        // checking if not valid event
        // if not valid sending error else proceeding further
        if (event === null) {
          res.send({
            status: false,
            data: 'EVENT_NOT_FOUND',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000)
          })
        } else {
          // checking if email registered
          const user = event.Registrations.find(
            /**
             * @param {*} e
             */
            (e) => {
              return e.email === req.body.email
            }
          )

          // if found then return registered msg else add to registrations array
          if (user) {
            res.send({
              status: false,
              data: 'EMAIL_REGISTERED',
              path: req.path,
              timestamp: Math.trunc(Date.now() / 1000)
            })
          } else {
            // adding to registrations array
            event.Registrations.push({
              name: req.body.name,
              roll: req.body.roll,
              email: req.body.email,
              mobile: req.body.mobile
            })

            // saving
            event
              .save()
              .then(() => {
                res.send({
                  status: true,
                  data: 'REGISTERED_FOR_EVENT',
                  path: req.path,
                  timestamp: Math.trunc(Date.now() / 1000)
                })
              })
              .catch((err) => {
                if (err) throw err
                res.send({
                  status: false,
                  data: 'SOMETHING_WENT_WRONG',
                  path: req.path,
                  timestamp: Math.trunc(Date.now() / 1000)
                })
              })
          }
        }
      }
    )
    .catch(() => {
      res.send({
        status: false,
        data: 'EVENT_NOT_FOUND',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * get all registrations for an event
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const getRegistrationsOfEvent = async (req, res) => {
  UpcomingEventModel.findById(req.params.id)
    .then(
      /**
       * @param {*} event
       */
      (event) => {
        if (!event) {
          return res.send({
            status: false,
            data: 'EVENT_NOT_FOUND',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000)
          })
        }
        if (event.Registrations.length === 0) {
          res.send({
            status: false,
            data: 'NO_REGISTRATIONS_FOUND',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000)
          })
        } else {
          res.send({
            status: true,
            data: event.Registrations,
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000)
          })
        }
      }
    )
    .catch(() => {
      res.send({
        status: false,
        data: 'EVENT_NOT_FOUND',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * updateOneUpcomingEvent
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const updateOneUpcomingEvent = async (req, res) => {
  UpcomingEventModel.findByIdAndUpdate(req.body.eventId, req.body.event)
    .then((data) => {
      res.json({
        status: true,
        data: data
      })
    })
    .catch((err) => {
      res.json({
        status: false,
        data: err
      })
    })
}
