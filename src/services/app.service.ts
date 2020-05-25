import { Request, Response } from 'express';
import { contactUsModel, newsletterModel } from '../models/app';

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
      res.status(200).send({
        status: true,
        data: 'FORM_SUBMITTED',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
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
