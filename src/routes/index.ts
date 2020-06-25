import { Router, RouterOptions } from 'express';
import { accountService } from '../services';
import { default as appRoutes } from './app/app';
import { default as upcomingEventRoutes } from './upcomingEvent/upcomingEvent';
import { default as authRoutes } from './auth/auth';
import { default as galleryRoute } from './gallery/gallery'
import passport from 'passport';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

$.get('/user', accountService.user);

/*
 * appRoutes contain routes for contact-us forms
 * and subscribe for newsletter
 */
$.use('/app', appRoutes);

// upcomingEvents routes
$.use('/upcoming-event', upcomingEventRoutes);

// gallery routes
$.use('/',galleryRoute);



// authorization routes
$.use('/auth', authRoutes);

// test route for passport
$.get(
  '/passport-test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('Accessed');
  }
);

export default $;
