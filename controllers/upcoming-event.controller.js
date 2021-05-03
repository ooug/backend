// eslint-disable-next-line no-unused-vars
const e = require('express')

const { UpcomingEventModel } = require('../models')

/**
 * add upcoming event
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.addUpcomingEvent = async (req, res) => {
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
exports.getAllUpcomingEvent = async (req, res) => {
  UpcomingEventModel.find()
    .select('-Registrations')
    .then((events) => {
      const filteredEvents = events.filter((e) => {
        const eventDate = Date.parse(
          new Date(
            // @ts-ignore
            `${e.date.day} ${e.date.month}, ${e.date.year} ${e.time}`
          ).toString()
        )
        const dateNow = Date.parse(new Date().toString())
        if (dateNow > eventDate) {
          return null
        }
        return e
      })
      console.log(filteredEvents)
      res.send({
        status: true,
        data: filteredEvents,
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
exports.getOneUpcomingEvent = async (req, res) => {
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
exports.deleteOneUpcomingEvent = async (req, res) => {
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
exports.registerForEvent = async (req, res) => {
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
          const user = event.registrations.find(
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
            event.registrations.push({
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
exports.getRegistrationsOfEvent = async (req, res) => {
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
exports.updateOneUpcomingEvent = async (req, res) => {
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
