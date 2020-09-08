import { Request, Response } from 'express';
import { upcomingEventModel } from '../models/upcomingEvent';

// add upcoming event
export const addUpcomingEvent = async (req: Request, res: Response) => {
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

// get all upcoming event
export const getAllUpcomingEvent = async (req: Request, res: Response) => {
  upcomingEventModel
    .find()
    .select('-Registrations')
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

// get one upcoming event
export const getOneUpcomingEvent = async (req: Request, res: Response) => {
  upcomingEventModel
    .findById(req.params.id)
    .select('-Registrations')
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

// delete one upcoming event
export const deleteOneUpcomingEvent = async (req: Request, res: Response) => {
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

// register for an event
export const registerForEvent = async (req: Request, res: Response) => {
  upcomingEventModel
    .findById(req.body.id)
    .then((event: any) => {
      // checking if not valid event
      // if not valid sending error else proceeding further
      if (event === null) {
        res.send({
          status: false,
          data: 'EVENT_NOT_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      } else {
        // checking if email registered
        const user = event.Registrations.find((e: any) => {
          return e.email === req.body.email;
        });

        // if found then return registered msg else add to registrations array
        if (user) {
          res.send({
            status: false,
            data: 'EMAIL_REGISTERED',
            path: req.path,
            timestamp: Math.trunc(Date.now() / 1000),
          });
        } else {
          // adding to registrations array
          event.Registrations.push({
            name: req.body.name,
            roll: req.body.roll,
            email: req.body.email,
            mobile: req.body.mobile,
          });

          // saving
          event
            .save()
            .then(() => {
              res.send({
                status: true,
                data: 'REGISTERED_FOR_EVENT',
                path: req.path,
                timestamp: Math.trunc(Date.now() / 1000),
              });
            })
            .catch((err: any) => {
              res.send({
                status: false,
                data: 'SOMETHING_WENT_WRONG',
                path: req.path,
                timestamp: Math.trunc(Date.now() / 1000),
              });
            });
        }
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

// get all registrations for an event
export const getRegistrationsOfEvent = async (req: Request, res: Response) => {
  upcomingEventModel
    .findById(req.params.id)
    .then((event: any) => {
      if (!event) {
        return res.send({
          status: false,
          data: 'EVENT_NOT_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      }
      if (event.Registrations.length === 0) {
        res.send({
          status: false,
          data: 'NO_REGISTRATIONS_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      } else {
        res.send({
          status: true,
          data: event.Registrations,
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

export const updateOneUpcomingEvent = async (req: Request, res: Response) => {
  upcomingEventModel
    .findByIdAndUpdate(req.body.eventId, req.body.event)
    .then((data) => {
      res.json({
        status: true,
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        data: err,
      });
    });
};
