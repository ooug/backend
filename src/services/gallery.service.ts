import { Request ,Response} from 'express';
import { galleryModel } from '../models/gallery';
import { Storage} from '@google-cloud/storage';
import * as path from 'path';
import { error } from "../utils";


const storage = new  Storage({
    projectId: "fir-gallery-231f2",
    keyFilename: path.join(__dirname , "../assets/gallery/fir-gallery-231f2.json")
  });


  
  
  const bucket = storage.bucket("gs://fir-gallery-231f2.appspot.com");
  
  
  

  
  /**
   * Adding new file to the storage
   */
  export const galleryImageUpload= async  ( req:Request, res:Response ) => {
      JSON.stringify(req.body)
    console.log('Upload Image');
    const image = req.file;
    const eventName = req.body.eventName;
    const description = req.body.description;
  
    
    if (image) {
      uploadImageToStorage(image).then((success) => {
        console.log('success'+ success)
        const saveimage = new galleryModel({eventName:eventName,image:success,description:description})
        saveimage.save()
        .then(()=>{
          console.log('datasaved')
          res.status(200).send({status: 'success'});
        })
        .catch((err:any) => {
            console.error(err);
  
  
        })
    
  });
    }};
  
  /**
   * Upload the image file to Google Storage
   * @param {File} file object that will be uploaded to Google Storage
   */
  const uploadImageToStorage = (image :any) => {
    return new Promise((resolve, reject) => {
      if (!image) {
        reject('No image file');
      }
      const newImageName = `galery/${image.originalname}_${Date.now()}`;
      console.log(newImageName)
  
      let imageUpload = bucket.file(newImageName);
      console.log(image.mimetype)
  
      const blobStream = imageUpload.createWriteStream({
        metadata: {
          contentType: image.mimetype
        }
      });
     
  
      blobStream.on('error', (error) => {
        console.log(error)
        reject("something went wrong ");
      });
  
      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        console.log(bucket.name)
        
  
        const url = `https://storage.googleapis.com/${bucket.name}/${imageUpload.name}`
        console.log(url)
        resolve(url)
        
     });
  
      blobStream.end(image.buffer);
    });
  }

 export const CountLikeInImage= async(req: Request, res:Response)=>{
  galleryModel.findById(req.body.id).then((image:any)=>{
    image.like++;
    image.save().then(()=>{
      res.send({
        status: true,
        data:'Like incremented',
      })
    }).catch((err:any) =>{
    res.send({
    data:err,
    })
    })
 })
}