import { default as mongoose } from 'mongoose';



const imageSchema = new mongoose.Schema({
  imageName: String
});

export const imageModel = mongoose.model('imageSlider', imageSchema);