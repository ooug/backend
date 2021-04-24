import mongoose from 'mongoose'

const imageSliderSchema = new mongoose.Schema({
  imageName: { type: String },
  url: { type: String }
})

const eventSchema = new mongoose.Schema({
  eventImage: { type: String },
  eventType: { type: String },
  eventDate: { type: String },
  eventOn: { type: String },
  organizedBy: { type: String },
  organizedAt: { type: String },
  eventDetails: { type: String }
})

export const ImageSlider = mongoose.model('imageSliders', imageSliderSchema)
export const EventDetail = mongoose.model('eventDetails', eventSchema)
