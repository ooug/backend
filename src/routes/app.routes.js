import e from 'express'
import {
  newsletterUnsubscribe,
  contactUs,
  getContactUsRequests,
  newsletterSubscribe,
  getNewsletterSubscription,
  sendNewsletter,
  getNewsletterHistory
} from '../controllers'

/**
 * @type {e.RouterOptions}
 */
const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false
}

const $ = e.Router(options)

// submitting contact us form
$.post('/contact-us', contactUs)
// get contact us request
$.get('/get-contact-us-requests', getContactUsRequests)
// subscribe newsletter
$.post('/newsletter-subscribe', newsletterSubscribe)
// unsubscribe newsletter
$.delete('/newsletter-unsubscribe', newsletterUnsubscribe)
// get newsletter subscriptions
$.get('/get-newsletter-subscriptions', getNewsletterSubscription)
// send newsLetter
$.post('/send-newsletter', sendNewsletter)
// get newsletter history
$.get('/get-newsletter-history', getNewsletterHistory)

export default $
