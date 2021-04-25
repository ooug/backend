const mongoose = require('mongoose')

// creating contact form schema
const contactUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  timeStamp: { type: String, required: true }
})

// creating newsletter schema
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  timeStamp: { type: String, required: true }
})

const newsLetterHistorySchema = new mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  fileUrl: { type: String, default: null },
  timeStamp: { type: String, required: true }
})

// exporting contactUsModel
exports.ContactUsModel = mongoose.model('contacts', contactUsSchema)

// exporting newsletterModel
exports.NewsletterModel = mongoose.model('newsletters', newsletterSchema)

// exporting newsLetterHistoryModel
exports.NewsLetterHistoryModel = mongoose.model(
  'newsletterHistories',
  newsLetterHistorySchema
)
