import { Request, Response } from 'express';
import { imageSlider, eventDetail } from '../models/activities.model';
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
  const file = req.body.file;
  file.buffer = Buffer.from(file.buffer, "base64")
  file.buffer = Buffer.from(file.buffer, 'utf8');
  const sliderurl = req.body.url;
  if (file) {
    PostImageSliderStorage(file, sliderurl).then((success) => {
      res.send({status: 'success'});
    }).catch((err) => {
      console.error(err);
    });
  }
}
export const deleteUpcoming = async (req: Request, res: Response) =>{
  imageSlider.findByIdAndRemove(req.body.id)
    .then((success) => {
      res.send({status: 'success'});
    }).catch((err) => {
      console.error(err);
    })
}

export const updateUpcomingWithoutImage = async (req: Request, res: Response) =>{
  const file = req.body.file;
  const link = req.body.url;
  imageSlider.updateOne({_id:req.body.id}, { imageName: file, url: link })
    .then((success) => {
      res.send({status: 'success'});
    }).catch((err) => {
      console.error(err);
    })
}
export const updateUpcomingWithImage = async (req: Request, res: Response) =>{
  const file = req.body.file;
  file.buffer = Buffer.from(file.buffer, "base64")
  file.buffer = Buffer.from(file.buffer, 'utf8');
  const link = req.body.url;

  if(file){
    UpdateUpcomingImage(file)
    .then((success) => {
      imageSlider.updateOne({_id:req.body.id}, {imageName: success, url: link})
    .then((s) => {
      res.send({status: 'success'});
    }).catch((err) => {
      console.error(err);
    })
    }).catch((error) => {
      console.error(error);
    })
  }
}

export const postEventDetail = async ( req: Request, res: Response ) =>{
  const file = req.body.file;
  file.buffer = Buffer.from(file.buffer, "base64")
  file.buffer = Buffer.from(file.buffer, 'utf8');
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
export const getRecentEventDetail = async ( req: Request, res: Response ) =>{
  eventDetail.aggregate([{$limit: 6}]).then((docs)=>{
      res.status(200).send(docs);
  }).catch((err)=>{
    res.status(200).send("Error occur in fetching data : " + err);
  })
}
export const getEventDetail = async (req: Request, res: Response) =>{
  eventDetail.find({}).then((docs)=>{
    res.status(200).send(docs);
}).catch((err)=>{
  res.status(200).send("Error occur in fetching data : " + err);
})
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

export const deleteEvent = async (req: Request, res: Response) =>{
  eventDetail.findByIdAndRemove(req.body.id)
    .then((success) => {
      res.send({status: 'success'});
    }).catch((err) => {
      console.error(err);
    })
}
export const updateEventWithoutImage = async (req: Request, res: Response) =>{
  const event = req.body.eventType;
  const date = req.body.date;
  const on = req.body.eventOn;
  const by = req.body.organizedBy;
  const at = req.body.organizedAt;
  const details = req.body.eventDetails;
  eventDetail.updateOne({_id:req.body.id}, { eventType:event, eventDate:date, eventOn:on, organizedBy:by, organizedAt:at, eventDetails:details })
    .then((success) => {
      res.send({status: 'success'});
    }).catch((err) => {
      console.error(err);
    })
}

export const updateEventWithImage = async (req: Request, res: Response) =>{
  const file = req.body.file;
  file.buffer = Buffer.from(file.buffer, "base64")
  file.buffer = Buffer.from(file.buffer, 'utf8');

  const id = req.body.id;
  const type = req.body.eventType;
  const date = req.body.date;
  const on = req.body.eventOn;
  const by = req.body.organizedBy;
  const at = req.body.organizedAt;
  const details = req.body.eventDetails;
  if(file){
    UpdateActivityDetail(file)
    .then((success) => {
      eventDetail.updateOne({_id:req.body.id}, {eventImage: success, eventType: type, eventDate: date, eventOn: on, organizedBy: by, organizedAt: at, eventDetails: details})
    .then((s) => {
      res.send({status: 'success'});
    }).catch((err) => {
      console.error(err);
    })
    }).catch((error) => {
      console.error(error);
    })
  }
}

const UpdateActivityDetail = (file:any) =>{
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
      resolve(url);
    });
    blobStream.end(file.buffer);
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

const UpdateUpcomingImage = (file: any) => {
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
      resolve(imageUrl);
    });
    blobStream.end(file.buffer);
  });
}


