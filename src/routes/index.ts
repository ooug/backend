import { Router, RouterOptions } from 'express';
import { accountService } from '../services';
import { default as activitiesRoutes } from './activities/activities';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

$.get(`/user`, accountService.user);
$.use('/', activitiesRoutes);

export default $;