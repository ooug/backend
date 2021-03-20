import { Router, RouterOptions } from 'express';
import { appService } from '../services';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

// submitting contact us form
$.post('/contact-us', appService.contactUs);

// get contact us request
$.get('/get-contact-us-requests', appService.getContactUsRequests);

// subscribe newsletter
$.post('/newsletter-subscribe', appService.newsletterSubscribe);

// unsubscribe newsletter
$.delete('/newsletter-unsubscribe', appService.newsletterUnsubscribe);

// get newsletter subscriptions
$.get('/get-newsletter-subscriptions', appService.getNewsletterSubscription);

// send newsLetter
$.post('/send-newsletter', appService.sendNewsletter);

// get newsletter history
$.get('/get-newsletter-history', appService.getNewsletterHistory);

export default $;
