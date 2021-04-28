// Routes
const activitiesRoutes = require('./activities.routes')
const appRoutes = require('./app.routes.js')
const upcomingEventRoutes = require('./upcoming-event.routes')
const authRoutes = require('./auth.routes')
const blogRoutes = require('./blog.routes')
const galleryRoutes = require('./gallery.route')

// Controller
const { user } = require('../controllers')

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

// gallery routes
$.use('/gallery', galleryRoutes)

// test route for passport
$.get(
  '/passport-test',
  passport.authenticate('jwt', { session: false }),
  (_req, res) => {
    res.send('Accessed')
  }
)

module.exports = $
