import e from 'express'
import {
  addUpcomingEvent,
  deleteOneUpcomingEvent,
  getAllUpcomingEvent,
  getOneUpcomingEvent,
  getRegistrationsOfEvent,
  registerForEvent,
  updateOneUpcomingEvent
} from '../services/index.js'

/**
 * @type {e.RouterOptions}
 */
const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false
}

const $ = e.Router(options)

// creating upcoming event
$.post('/create', addUpcomingEvent)
// get all upcoming event
$.get('/get-all', getAllUpcomingEvent)
// get one upcoming event
$.get('/get-one/:id', getOneUpcomingEvent)
// delete one upcoming event
$.post('/delete-one', deleteOneUpcomingEvent)
// register for an event
$.post('/register', registerForEvent)
// get registration for an event
$.get('/registrations/:id', getRegistrationsOfEvent)
// update event
$.post('/update-one', updateOneUpcomingEvent)

export default $
