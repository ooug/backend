import e from 'express'
import passport from 'passport'

// Routes
import activitiesRoutes from './activities.routes'
import appRoutes from './app.routes'
import upcomingEventRoutes from './upcoming-event.routes'
import authRoutes from './auth.routes'
import blogRoutes from './blog.routes'

// Services
import { user } from '../controllers'

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

export default $
