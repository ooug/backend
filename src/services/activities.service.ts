import { Request, Response } from 'express';
import { imageSlider, eventDetail } from '../models/activities';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import { error } from '../utils';

const storage = new Storage({
  projectId: "ooug-cc348",
  keyFilename: path.join(__dirname , "../assets/activities/ooug-cc348.json")
});
const bucket = storage.bucket("gs://ooug-cc348.appspot.com");

export const getImageSlider = async ( req: Request, res: Response) =>{
  imageSlider.find({}).then((docs:any)=>{
    res.status(200).send(docs);
  }).catch((err:any)=>{
    res.send(err);
  });
}

export const postImageSlider = async ( req: Request, res: Response) =>{
  JSON.stringify(req.body)
  const file = req.file;
  const sliderurl = req.body.sliderUrl;
  if (file) {
    PostImageSliderStorage(file, sliderurl).then((success) => {
      res.send({status: 'success'});
    }).catch((err) => {
      console.error(err);
    });
  }
}

export const postEventDetail = async ( req: Request, res: Response ) =>{
  JSON.stringify(req.body);
  const file = req.file;
  const eventType = req.body.eventType;
  const date = req.body.date;
  const eventOn = req.body.eventOn;
  const organizedBy = req.body.organizedBy;
  const organizedAt = req.body.organizedAt;
  const eventDetails = req.body.eventDetails;
  if(file){
    PostActivityDetail(file, eventType, date, eventOn, organizedBy, organizedAt, eventDetails)
    .then((success) => {
      res.send({status: 'success'});
    }).catch((err) => {
      console.error(err);
    })
  }
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

const PostActivityDetail = (file:any, eventtype:any, date:any, eventon:any, organizedby:any, organizedat:any, eventdetails:any) =>{
  return new Promise((resolve, reject) => {
    if(!file){
      reject('no image file');
    }
    const newFileName = "activities/"+ new Date().toISOString() +file.originalname;
    const fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata:{
        contentType: file.mimetype
      }
    });
    blobStream.on('error', (error)=>{
      console.log(error)
    });
    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      console.log(url);
      resolve(url);
      const eventdetail  = new eventDetail({eventImage: url, eventType: eventtype, eventDate: date, eventOn: eventon, organizedBy: organizedby, organizedAt: organizedat, eventDetails: eventdetails});
      eventdetail.save().then(()=>{
        resolve("data saved")
      }).catch(()=>{
        resolve("error occured!");
      })

    });
    blobStream.end(file.buffer);
  })
}

const PostImageSliderStorage = (file: any, sliderurl: any) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    const newFileName = "imageslider/"+ new Date().toISOString() +file.originalname;
    const fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });
    blobStream.on('error', (error:any) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      console.log(imageUrl);
      const imageslider  = new imageSlider({ imageName: imageUrl, url: sliderurl });
      imageslider
    .save()
    .then(() => {
      resolve("data saved")
    })
    .catch(() => {
      resolve("error occurred");
    });
    });
    blobStream.end(file.buffer);
  });
}



