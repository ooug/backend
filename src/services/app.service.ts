import e, { Request, Response } from 'express';
import {
  contactUsModel,
  newsletterModel,
  newsLetterHistoryModel,
} from '../models';
import { sendMail } from '../utils/mailer.util';
import { uploadFile } from '../utils/file-uploader.util';

// contact us
export const contactUs = async (req: Request, res: Response) => {
  const contactUs = new contactUsModel({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    timeStamp: Math.trunc(Date.now() / 1000),
  });
  contactUs
    .save()
    .then(() => {
      sendMail(
        req.body.email,
        'Thank you for contacting OOUG.',
        '',
        'Dear ' +
          req.body.name +
          '<br><br>Thank you for contacting OOUG. Your request has been saved by us. Someone from our team will contact you soon.<br><br>Team OOUG'
      )
        .then(() => {
          res.status(200).send({
            status: true,
            data: 'FORM_SUBMITTED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000),
          });
        })
        .catch(() => {
          res.status(200).send({
            status: true,
            data: 'FORM_SUBMITTED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000),
          });
        });
    })
    .catch(() => {
      res.send({
        status: false,
        data: 'ERROR',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};

// get contact us requests
export const getContactUsRequests = async (req: Request, res: Response) => {
  contactUsModel
    .find()
    .sort({ timeStamp: -1 })
    .then((contactUsRequests) => {
      res.status(200).send({
        status: true,
        data: contactUsRequests,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    })
    .catch((err) => {
      res.status(200).send({
        status: false,
        data: err,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};

// newsletter sign up
export const newsletterSubscribe = async (req: Request, res: Response) => {
  // checking if already subscribed
  newsletterModel.findOne({ email: req.body.email }).then((doc) => {
    if (doc) {
      // found subscribed
      res.status(200).send({
        status: false,
        data: 'EMAIL_ALREADY_SUBSCRIBED',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    } else {
      // not subscribed. adding to newsletter collection
      const newSubscriber = new newsletterModel({
        email: req.body.email,
        timeStamp: Math.trunc(Date.now() / 1000),
      });
      newSubscriber
        .save()
        .then(() => {
          res.status(200).send({
            status: true,
            data: 'NEWSLETTER_SUBSCRIBED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000),
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(200).send({
            status: false,
            data: 'ERROR_OCCURRED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000),
          });
        });
    }
  });
};

// newsletter unsubscribe
export const newsletterUnsubscribe = async (req: Request, res: Response) => {
  // checking if already subscribed
  newsletterModel.findOne({ email: req.body.email }).then((doc) => {
    if (doc) {
      // delete subscribed
      newsletterModel
        .findOneAndDelete({ email: req.body.email })
        .then(() => {
          res.status(200).send({
            status: true,
            data: 'NEWSLETTER_UNSUBSCRIBED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000),
          });
        })
        .catch((err) => {
          res.status(200).send({
            status: false,
            data: 'ERROR_OCCURRED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000),
          });
        });
    } else {
      //if not subscribed
      res.status(200).send({
        status: false,
        data: 'EMAIL_IS_NOT_SUBSCRIBED',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    }
  });
};

// getting all newsletter subscription
export const getNewsletterSubscription = async (
  req: Request,
  res: Response
) => {
  newsletterModel
    .find()
    .then((subscriptions) => {
      res.status(200).send({
        status: true,
        data: subscriptions,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    })
    .catch((err) => {
      res.status(200).send({
        status: false,
        data: err,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};

// send newsletter to all subscriptions
export const sendNewsletter = async (req: Request, res: Response) => {
  if (req.body.file) {
    // handle file attachment here
    uploadFile(req.body.file)
      .then((url: any) => {
        newsletterModel
          .find()
          .then((subscriptions) => {
            const emailIds = subscriptions.map((e: any) => {
              return e.email;
            });
            sendMail(emailIds, req.body.subject, '', req.body.html, [
              { path: url },
            ])
              .then(() => {
                const newNewsletterHistory = new newsLetterHistoryModel({
                  subject: req.body.subject,
                  body: req.body.html,
                  fileUrl: url,
                  timeStamp: Math.trunc(Date.now() / 1000),
                });

                newNewsletterHistory
                  .save()
                  .then(() => {
                    res.status(200).send({
                      status: true,
                      data: 'NEWSLETTER_SENT',
                      path: req.path,
                      timestamp: Math.trunc(Date.now() / 1000),
                    });
                  })
                  .catch(() => {
                    res.status(200).send({
                      status: true,
                      data: 'NEWSLETTER_SENT',
                      path: req.path,
                      timestamp: Math.trunc(Date.now() / 1000),
                    });
                  });
              })
              .catch((err) => {
                res.status(200).send({
                  status: false,
                  data: err,
                  path: req.path,
                  timestamp: Math.trunc(Date.now() / 1000),
                });
              });
          })
          .catch((err) => {
            res.status(200).send({
              status: false,
              data: err,
              path: req.path,
              timestamp: Math.trunc(Date.now() / 1000),
            });
          });
      })
      .catch((err) => {
        res.status(200).send({
          status: false,
          data: err,
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      });
  } else {
    newsletterModel
      .find()
      .then((subscriptions) => {
        const emailIds = subscriptions.map((e: any) => {
          return e.email;
        });
        sendMail(emailIds, req.body.subject, '', req.body.html)
          .then(() => {
            const newNewsletterHistory = new newsLetterHistoryModel({
              subject: req.body.subject,
              body: req.body.html,
              fileUrl: null,
              timeStamp: Math.trunc(Date.now() / 1000),
            });

            newNewsletterHistory
              .save()
              .then(() => {
                res.status(200).send({
                  status: true,
                  data: 'NEWSLETTER_SENT',
                  path: req.path,
                  timestamp: Math.trunc(Date.now() / 1000),
                });
              })
              .catch(() => {
                res.status(200).send({
                  status: true,
                  data: 'NEWSLETTER_SENT',
                  path: req.path,
                  timestamp: Math.trunc(Date.now() / 1000),
                });
              });
          })
          .catch((err) => {
            res.status(200).send({
              status: false,
              data: err,
              path: req.path,
              timestamp: Math.trunc(Date.now() / 1000),
            });
          });
      })
      .catch((err) => {
        res.status(200).send({
          status: false,
          data: err,
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      });
  }
};

export const getNewsletterHistory = async (req: Request, res: Response) => {
  newsLetterHistoryModel
    .find()
    .sort({ timeStamp: -1 })
    .then((newsletters: any) => {
      res.status(200).send({
        status: true,
        data: newsletters,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    }).catch((err)=>{
      res.status(200).send({
        status: false,
        data: err,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    })
};
