const mongoose = require('mongoose')

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

exports.ImageSlider = mongoose.model('imageSliders', imageSliderSchema)
exports.EventDetail = mongoose.model('eventDetails', eventSchema)
