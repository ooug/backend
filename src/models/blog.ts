import { default as mongoose } from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  Date: {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
  },
  Author :{
    name:{ type: String, required: true },
    jobTitle :{ type: String, required: true },
    company :{ type: String, required: true },
    Image: {
      host: { type: String },
      path: { type: String, required: true },
    }
  },
  paragraph : { type: String, required: true },
  link : { type: String, required: true },
  category : { type: String, required: true },
  like : { type: Number, required: true },
  view : { type: Number, required: true }

});

export const blogModel = mongoose.model('user',blogSchema);
