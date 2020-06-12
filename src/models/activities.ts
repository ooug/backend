import { default as mongoose } from 'mongoose';

const imageSliderSchema = new mongoose.Schema({
  imageName: {type: String}
});

const EventSchema = new mongoose.Schema({
  eventType: {type: String, required: true},
  date: {type: String},
  eventOn: {type: String},
  organizedBy: {type: String},
  organizedAt: {type: String}
});

export const imageSlider = mongoose.model('imageSlider', imageSliderSchema);
export const eventDetail = mongoose.model('eventDetail', EventSchema);