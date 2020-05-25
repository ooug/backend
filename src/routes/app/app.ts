import { Router, RouterOptions } from 'express';
import { appService } from '../../services';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

// submitting contact us form
$.post('/contact-us', appService.contactUs);

// subscribe newsletter
$.post('/newsletter-subscribe', appService.newsletterSubscribe);

export default $;
