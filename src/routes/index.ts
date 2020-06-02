import { Router, RouterOptions } from 'express';
import { accountService } from '../services';
import { default as appRoutes } from './app/app';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

$.get(`/user`, accountService.user);

$.use('/about', appRoutes);

export default $;
