import { default as mongoose } from 'mongoose'



const gallerySchema = new mongoose.Schema({
    eventName:{type:String},
    image:{type:String},
    description:{type:String}
});

  export const galleryModel =  mongoose.model('gallery',gallerySchema);