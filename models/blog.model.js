const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  Date: {
    day: { type: String },
    month: { type: String },
    year: { type: String }
  },
  Author: {
    name: { type: String, required: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    Image: {
      host: { type: String },
      path: { type: String }
    }
  },
  paragraph: { type: String, required: true },
  link: { type: String },
  category: { type: String, required: true },
  like: { type: Number },
  view: { type: Number }
})

exports.BlogModel = mongoose.model('blogs', blogSchema)
