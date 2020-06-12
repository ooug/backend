import { Request, Response } from 'express';
import { imageSlider, eventDetail } from '../models/activities';

export const getImageSlider = async ( req: Request, res: Response) =>{
  imageSlider.find({}).then((docs:any)=>{
    res.status(200).send(docs);
  }).catch((err:any)=>{
    res.send(err);
  });
}
export const postImageSlider = async ( req: Request, res: Response) =>{
  const imageslider  = new imageSlider({ imageName: req.body.imageName });
  imageslider
    .save()
    .then(() => {
      res.send("data saved");
      console.log(req.body);
    })
    .catch(() => {
      res.send("error occurred");
    });
}
export const postEventDetail = async ( req: Request, res: Response ) =>{
  const eventdetail = new eventDetail({ eventType: req.body.eventType, date: req.body.date, eventOn: req.body.eventOn, organizedBy: req.body.organizedBy, organizedAt: req.body.organizedAt});
  eventdetail.save().then(() => { res.send("data saved "); })
  .catch(() => { res.send("error Occurred!"); });
}

export const getEventDetailWorkshop = async ( req: Request, res: Response ) =>{
  eventDetail.find({ eventType: "workshop" }).then((docs)=>{
      res.status(200).send(docs);
  }).catch((err)=>{
    res.status(200).send("Error occur in fetching data : " + err);
  })
}
export const getEventDetailTechbhukkads = async ( req: Request, res: Response ) =>{
  eventDetail.find({ eventType: "techbhukkads" }).then((docs)=>{
    res.status(200).send(docs);
  }).catch((err)=>{
    res.status(200).send("Error occur in fetching data : " + err);
  })
}
export const getEventDetailFarewell = async ( req: Request, res: Response ) =>{
  eventDetail.find({ eventType: "farewell" }).then((docs)=>{
    res.status(200).send(docs);
  }).catch((err)=>{
    res.status(200).send("Error occur in fetching data : " + err);
  })
}
