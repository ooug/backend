import{ Router , RouterOptions} from 'express';
import { galleryImageUpload} from '../../services/gallery.service';
import { Request, Response , NextFunction } from "express";
import { default as Multer } from "multer";
import { CountLikeInImage }  from '../../services/gallery.service';

const options = {
    strict: true,
    mergeParams: false,
    caseSensitive: false,
  } as RouterOptions;

  const multer = Multer({
        storage: Multer.memoryStorage(),
        limits: {
          fileSize: 50 * 1024 * 1024 // no larger than 50 mb

        }
      });

const $ = Router(options);

$.post('/imageUpload',multer.single('image') ,galleryImageUpload);

$.post('/like-count',CountLikeInImage);



export default $;