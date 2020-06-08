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

export default $;