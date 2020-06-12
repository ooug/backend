import { Router, RouterOptions } from 'express';
import { activitiesService } from '../../services';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

// activities page slider
$.use('/get-image-slider', activitiesService.getImageSlider);

$.post('/post-image-slider', activitiesService.postImageSlider);

$.get('/get-event-detail-workshop', activitiesService.getEventDetailWorkshop);
$.get('/get-event-detail-techbhukkads', activitiesService.getEventDetailTechbhukkads);
$.get('/get-event-detail-farewell', activitiesService.getEventDetailFarewell);


$.post('/post-event-detail', activitiesService.postEventDetail);

export default $;