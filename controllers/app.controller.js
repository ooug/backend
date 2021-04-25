// eslint-disable-next-line no-unused-vars
const e = require('express')

const {
  ContactUsModel,
  NewsletterModel,
  NewsLetterHistoryModel
} = require('../models')
const { sendMail, uploadFile } = require('../utils')

/**
 * contact us
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.contactUs = async (req, res) => {
  const contactUs = new ContactUsModel({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    timeStamp: Math.trunc(Date.now() / 1000)
  })
  contactUs
    .save()
    .then(() => {
      sendMail(
        req.body.email,
        'Thank you for contacting OOUG.',
        '',
        'Dear ' +
          req.body.name +
          '<br><br>Thank you for contacting OOUG. Your request has been saved by us. Someone = require( our team will contact you soon.<br><br>Team OOUG'
      )
        .then(() => {
          res.status(200).send({
            status: true,
            data: 'FORM_SUBMITTED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000)
          })
        })
        .catch(() => {
          res.status(200).send({
            status: true,
            data: 'FORM_SUBMITTED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000)
          })
        })
    })
    .catch(() => {
      res.send({
        status: false,
        data: 'ERROR',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * get contact us requests
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.getContactUsRequests = async (req, res) => {
  ContactUsModel.find()
    .sort({ timeStamp: -1 })
    .then((contactUsRequests) => {
      res.status(200).send({
        status: true,
        data: contactUsRequests,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
    .catch((err) => {
      res.status(200).send({
        status: false,
        data: err,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * newsletter sign up
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.newsletterSubscribe = async (req, res) => {
  // checking if already subscribed
  NewsletterModel.findOne({ email: req.body.email }).then((doc) => {
    if (doc) {
      // found subscribed
      res.status(200).send({
        status: false,
        data: 'EMAIL_ALREADY_SUBSCRIBED',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    } else {
      // not subscribed. adding to newsletter collection
      const newSubscriber = new NewsletterModel({
        email: req.body.email,
        timeStamp: Math.trunc(Date.now() / 1000)
      })
      newSubscriber
        .save()
        .then(() => {
          res.status(200).send({
            status: true,
            data: 'NEWSLETTER_SUBSCRIBED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000)
          })
        })
        .catch((err) => {
          console.log(err)
          res.status(200).send({
            status: false,
            data: 'ERROR_OCCURRED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000)
          })
        })
    }
  })
}

/**
 * newsletter unsubscribe
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.newsletterUnsubscribe = async (req, res) => {
  // checking if already subscribed
  NewsletterModel.findOne({ email: req.body.email }).then((doc) => {
    if (doc) {
      // delete subscribed
      NewsletterModel.findOneAndDelete({ email: req.body.email })
        .then(() => {
          res.status(200).send({
            status: true,
            data: 'NEWSLETTER_UNSUBSCRIBED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000)
          })
        })
        .catch(() => {
          res.status(200).send({
            status: false,
            data: 'ERROR_OCCURRED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000)
          })
        })
    } else {
      // if not subscribed
      res.status(200).send({
        status: false,
        data: 'EMAIL_IS_NOT_SUBSCRIBED',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    }
  })
}

/**
 * getting all newsletter subscription
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.getNewsletterSubscription = async (req, res) => {
  NewsletterModel.find()
    .then((subscriptions) => {
      res.status(200).send({
        status: true,
        data: subscriptions,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
    .catch((err) => {
      res.status(200).send({
        status: false,
        data: err,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * send newsletter to all subscriptions
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.sendNewsletter = async (req, res) => {
  if (req.body.file) {
    // handle file attachment here
    uploadFile(req.body.file)
      .then((url) => {
        NewsletterModel.find()
          .then((subscriptions) => {
            const emailIds = subscriptions.map(
              /**
               * @param {*} e
               */
              (e) => {
                return e.email
              }
            )
            sendMail(emailIds, req.body.subject, '', req.body.html, [
              { path: url }
            ])
              .then(() => {
                const newNewsletterHistory = new NewsLetterHistoryModel({
                  subject: req.body.subject,
                  body: req.body.html,
                  fileUrl: url,
                  timeStamp: Math.trunc(Date.now() / 1000)
                })

                newNewsletterHistory
                  .save()
                  .then(() => {
                    res.status(200).send({
                      status: true,
                      data: 'NEWSLETTER_SENT',
                      path: req.path,
                      timestamp: Math.trunc(Date.now() / 1000)
                    })
                  })
                  .catch(() => {
                    res.status(200).send({
                      status: true,
                      data: 'NEWSLETTER_SENT',
                      path: req.path,
                      timestamp: Math.trunc(Date.now() / 1000)
                    })
                  })
              })
              .catch((err) => {
                res.status(200).send({
                  status: false,
                  data: err,
                  path: req.path,
                  timestamp: Math.trunc(Date.now() / 1000)
                })
              })
          })
          .catch((err) => {
            res.status(200).send({
              status: false,
              data: err,
              path: req.path,
              timestamp: Math.trunc(Date.now() / 1000)
            })
          })
      })
      .catch((err) => {
        res.status(200).send({
          status: false,
          data: err,
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      })
  } else {
    NewsletterModel.find()
      .then((subscriptions) => {
        const emailIds = subscriptions.map(
          /**
           * @param {*} e
           */
          (e) => {
            return e.email
          }
        )
        sendMail(emailIds, req.body.subject, '', req.body.html)
          .then(() => {
            const newNewsletterHistory = new NewsLetterHistoryModel({
              subject: req.body.subject,
              body: req.body.html,
              fileUrl: null,
              timeStamp: Math.trunc(Date.now() / 1000)
            })

            newNewsletterHistory
              .save()
              .then(() => {
                res.status(200).send({
                  status: true,
                  data: 'NEWSLETTER_SENT',
                  path: req.path,
                  timestamp: Math.trunc(Date.now() / 1000)
                })
              })
              .catch(() => {
                res.status(200).send({
                  status: true,
                  data: 'NEWSLETTER_SENT',
                  path: req.path,
                  timestamp: Math.trunc(Date.now() / 1000)
                })
              })
          })
          .catch((err) => {
            res.status(200).send({
              status: false,
              data: err,
              path: req.path,
              timestamp: Math.trunc(Date.now() / 1000)
            })
          })
      })
      .catch((err) => {
        res.status(200).send({
          status: false,
          data: err,
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      })
  }
}

/**
 * getNewsletterHistory
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.getNewsletterHistory = async (req, res) => {
  NewsLetterHistoryModel.find()
    .sort({ timeStamp: -1 })
    .then((newsletters) => {
      res.status(200).send({
        status: true,
        data: newsletters,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
    .catch((err) => {
      res.status(200).send({
        status: false,
        data: err,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}
