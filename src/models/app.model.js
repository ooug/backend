import mongoose from 'mongoose'

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
export const ContactUsModel = mongoose.model('contacts', contactUsSchema)

// exporting newsletterModel
export const NewsletterModel = mongoose.model('newsletters', newsletterSchema)

// exporting newsLetterHistoryModel
export const NewsLetterHistoryModel = mongoose.model(
  'newsletterHistories',
  newsLetterHistorySchema
)
