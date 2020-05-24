import { Router, RouterOptions, Request, Response } from 'express';
import { default as ContactUsModel } from '../../models/contactUs';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

// submitting contact us form
$.post('/contact-us', async (req: Request, res: Response) => {
  const contactUs = new ContactUsModel({
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
    .catch((err) => {
      // console.log(err);
      res.send({
        status: false,
        data: 'ERROR',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
});


// test route
$.get('/test', async (req: Request, res: Response) => {
  res.status(200).send({ status: true, message: 'Success' });
});

export default $;
