import { Router, RouterOptions } from 'express';
import { accountService } from '../services';
import { default as aboutRoutes } from './about/about';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

$.get(`/user`, accountService.user);

$.use('/about',aboutRoutes);


export default $;