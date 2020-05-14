import { Router, RouterOptions } from 'express';
import { accountService } from '../services';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

$.get(`/user`, accountService.user);


export default $;