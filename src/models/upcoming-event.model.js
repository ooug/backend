import mongoose from 'mongoose'

// creating upcoming event model
const upcomingEventSchema = new mongoose.Schema({
  Image: {
    host: { type: String },
    path: { type: String, required: true }
  },
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  enableRegistration: { type: Boolean, required: true },
  Date: {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true }
  },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  Registrations: [
    {
      name: { type: String, required: true },
      roll: { type: String, required: true },
      email: { type: String, required: true },
      mobile: { type: String, required: true }
    }
  ]
})

// exporting upcoming event model
export const UpcomingEventModel = mongoose.model(
  'upcomingEvents',
  upcomingEventSchema
)
