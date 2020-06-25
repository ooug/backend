import{ Router , RouterOptions} from 'express';
import { galleryService} from '../../services';
import { Request, Response , NextFunction } from "express";
import { default as Multer } from "multer";

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

$.post('/post-gallery-detail',multer.single('image') ,galleryService.galleryImageUpload);

$.get('/get-gallery-detail',galleryService.fetchAlldetail);

$.get('/get-gallery-detail?event',galleryService.fetchImagebyEvent);


export default $;