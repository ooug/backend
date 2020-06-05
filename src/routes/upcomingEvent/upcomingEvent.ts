import { Router, RouterOptions } from 'express';
import { upcomingEventService } from '../../services';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

// creating upcoming event
$.post('/create', upcomingEventService.addUpcomingEvent);

// get all upcoming event
$.get('/get-all', upcomingEventService.getAllUpcomingEvent);

// get one upcoming event
$.get('/get-one', upcomingEventService.getOneUpcomingEvent);

// delete one upcoming event
$.delete('/delete-one', upcomingEventService.deleteOneUpcomingEvent);

// register for an event
$.post('/register', upcomingEventService.registerForEvent);

export default $;
