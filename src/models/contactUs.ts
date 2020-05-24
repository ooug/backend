import { default as mongoose } from 'mongoose';

// creating contact form schema
const contactUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  timeStamp: { type: String, required: true },
});

// exporting contactUsModel
export default mongoose.model('contactUs', contactUsSchema);
