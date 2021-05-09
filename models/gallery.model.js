const mongoose = require('mongoose')

const galleryModel = new mongoose.Schema({
  sliders: [
    {
      image: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true }
    }
  ],
  images: [
    {
      image: { type: String, required: true },
      description: { type: String, required: true }
    }
  ]
})

exports.GalleryModel = mongoose.model('gallery', galleryModel)
