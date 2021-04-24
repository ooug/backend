// Routes
import activitiesRoutes from './activities.routes.js'
import appRoutes from './app.routes.js'
import upcomingEventRoutes from './upcoming-event.routes.js'
import authRoutes from './auth.routes.js'
import blogRoutes from './blog.routes.js'

// Controller
import { user } from '../controllers/index.js'

const e = require('express')
const passport = require('passport')

/**
 * @type {e.RouterOptions}
 */
const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false
}

const $ = e.Router(options)

$.get('/user', user)
$.use('/', activitiesRoutes)
$.post('/', activitiesRoutes)
$.get('/user', user)

/*
 * appRoutes contain routes for contact-us forms
 * and subscribe for newsletter
 */
$.use('/app', appRoutes)

// upcomingEvents routes
$.use('/upcoming-event', upcomingEventRoutes)

// authorization routes
$.use('/auth', authRoutes)

// blog routes
$.use('/blog', blogRoutes)

// test route for passport
$.get(
  '/passport-test',
  passport.authenticate('jwt', { session: false }),
  (_req, res) => {
    res.send('Accessed')
  }
)

module.exports = $
