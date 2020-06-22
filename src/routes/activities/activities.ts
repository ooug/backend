import { Router, RouterOptions } from 'express';
import { activitiesService } from '../../services'
import { Request, Response, NextFunction } from 'express';
import {default as Multer} from 'multer';


const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits:{
    fileSize: 50*1024*1024
  }
});

const $ = Router(options);

// activities page slider
$.use('/get-image-slider', activitiesService.getImageSlider);
$.post('/post-image-slider', multer.single('file'), activitiesService.postImageSlider);

$.get('/get-event-detail-workshop' , activitiesService.getEventDetailWorkshop);
$.get('/get-event-detail-techbhukkads', activitiesService.getEventDetailTechbhukkads);
$.get('/get-event-detail-farewell', activitiesService.getEventDetailFarewell);
$.post('/post-event-detail', multer.single('file'), activitiesService.postEventDetail);

export default $;