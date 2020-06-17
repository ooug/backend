import { Request, Response } from 'express';
import { userModel as User } from '../models/user';
import { default as passport } from 'passport';
import { default as jwt } from 'jsonwebtoken';

export const signup = (req: Request, res: Response) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(200).json({
        status: true,
        data: 'SIGNUP_SUCCESSFUL',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    })
    .catch((err: any) => {
      res.status(500).json({
        status: false,
        data: 'ERROR_OCCURRED',
        error: err,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};

export const login = (req: Request, res: Response) => {
  passport.authenticate('local',{session:false},(err,user,info)=>{
    if(err){
      return res.status(500).send({
        status: false,
        data: 'ERROR_OCCURRED',
        error: err,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      })
    }

    if(!user){
      return res.status(500).send({
        status: false,
        data: info.message,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      })
    }
    else{
      return res.status(200).send(user);
    }
  })(req,res);
};
