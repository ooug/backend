import { Request, Response } from 'express';
import { upcomingEventModel } from '../models/upcomingEvent';

export const addUpcomingEvent = (req: Request, res: Response) => {
  let newEvent = new upcomingEventModel(req.body);
  newEvent
    .save()
    .then(() => {
      res.send({
        status: true,
        data: 'EVENT_CREATED',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        data: 'EVENT_NOT_CREATED',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};

export const getAllUpcomingEvent = (req: Request, res: Response) => {
  upcomingEventModel
    .find()
    .then((events) => {
      res.send({
        status: true,
        data: events,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        data: 'SOMETHING_WENT_WRONG',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};

export const getOneUpcomingEvent = (req: Request, res: Response) => {
  upcomingEventModel
    .findById(req.body.id)
    .then((event) => {
      if (event) {
        res.send({
          status: true,
          data: event,
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      } else {
        res.send({
          status: false,
          data: 'EVENT_NOT_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        data: 'EVENT_NOT_FOUND',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};

export const deleteOneUpcomingEvent = (req: Request, res: Response) => {
  upcomingEventModel
    .findByIdAndDelete(req.body.id)
    .then((event) => {
      if (event) {
        res.send({
          status: true,
          data: 'EVENT_DELETED',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      } else {
        res.send({
          status: false,
          data: 'EVENT_NOT_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      }
    })
    .catch(() => {
      res.send({
        status: false,
        data: 'EVENT_NOT_FOUND',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};
