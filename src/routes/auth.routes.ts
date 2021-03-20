import { Router, RouterOptions } from 'express';
import { authService } from '../services';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

$.post('/signup', authService.signup);

$.post('/login',authService.login);

$.post('/send-otp',authService.sendOtp);

$.post('/reset-password',authService.resetPassword);

export default $;
