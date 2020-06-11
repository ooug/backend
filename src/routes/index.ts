import { Router, RouterOptions } from 'express';
import { accountService } from '../services';
import { default as appRoutes } from './app/app';
import { default as upcomingEventRoutes } from './upcomingEvent/upcomingEvent';

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
$.use('/upcoming-event',upcomingEventRoutes);

export default $;
