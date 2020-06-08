import { Request, Response } from 'express';
import { imageModel } from '../models/activities';

export const getImageSlider = async ( req: Request, res: Response) =>{
  imageModel.find({}).then((docs:any)=>{
    res.status(200).send(docs);
  }).catch((err:any)=>{
    console.log(err);
  });
}
export const postImageSlider = async ( req: Request, res: Response) =>{
  const imageSlider  = new imageModel({ imageName: '2.jpg' });
  imageSlider
    .save()
    .then(() => {
      res.send("data saved");
    })
    .catch(() => {
      res.send("error occurred");
    });
}
