import { default as mongoose } from 'mongoose';

// creating contact form schema
const contactUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  timeStamp: { type: String, required: true },
});

// creating newsletter schema
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  timeStamp: { type: String, required: true },
});

const newsLetterHistorySchema = new mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  fileUrl: { type: String, default: null },
  timeStamp: { type: String, required: true },
});

// exporting contactUsModel
export const contactUsModel = mongoose.model('contactUs', contactUsSchema);

// exporting newsletterModel
export const newsletterModel = mongoose.model('newsletter', newsletterSchema);

// exporting newsLetterHistoryModel
export const newsLetterHistoryModel = mongoose.model(
  'newsletter_history',
  newsLetterHistorySchema
);
