import e from 'express'
import Multer from 'multer'
import {
  deleteEvent,
  deleteUpcoming,
  getEventDetail,
  getEventDetailFarewell,
  getEventDetailTechbhukkads,
  getEventDetailWorkshop,
  getImageSlider,
  getRecentEventDetail,
  postEventDetail,
  postImageSlider,
  updateEventWithImage,
  updateEventWithoutImage,
  updateUpcomingWithImage,
  updateUpcomingWithoutImage
} from '../controllers'

/**
 * @type {e.RouterOptions}
 */
const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false
}

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024
  }
})

const $ = e.Router(options)

// activities page slider
$.use('/get-image-slider', getImageSlider)
$.post('/post-image-slider', multer.single('file'), postImageSlider)
$.post('/delete-upcoming-detail', deleteUpcoming)
$.post('/update-upcoming-without-image', updateUpcomingWithoutImage)
$.post('/update-upcoming-with-image', updateUpcomingWithImage)
$.post('/update-event-detail-without-image', updateEventWithoutImage)
$.post(
  '/update-event-detail-with-image',
  multer.single('file'),
  updateEventWithImage
)
$.post('/delete-event-detail', deleteEvent)
$.get('/get-event-detail', getEventDetail)
$.get('/get-recent-event-detail', getRecentEventDetail)
$.get('/get-event-detail-workshop', getEventDetailWorkshop)
$.get('/get-event-detail-techbhukkads', getEventDetailTechbhukkads)
$.get('/get-event-detail-farewell', getEventDetailFarewell)
$.post('/post-event-detail', multer.single('file'), postEventDetail)

export default $
