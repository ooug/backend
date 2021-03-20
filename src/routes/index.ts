import { Router, RouterOptions } from 'express';
import passport from 'passport';

// Routes
import activitiesRoutes from './activities.routes';
import appRoutes from './app.routes';
import upcomingEventRoutes from './upcoming-event.routes';
import authRoutes from './auth.routes';
import blogRoutes from './blog.routes'
// Services
import { accountService } from '../services';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

$.get('/user', accountService.user);
$.use('/', activitiesRoutes);
$.post('/', activitiesRoutes)
$.get('/user', accountService.user);

/*
 * appRoutes contain routes for contact-us forms
 * and subscribe for newsletter
 */
$.use('/app', appRoutes);

// upcomingEvents routes
$.use('/upcoming-event', upcomingEventRoutes);

// authorization routes
$.use('/auth', authRoutes);

//blog routes
$.use('/blog', blogRoutes)

// test route for passport
$.get(
  '/passport-test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('Accessed');
  }
);

export default $;
