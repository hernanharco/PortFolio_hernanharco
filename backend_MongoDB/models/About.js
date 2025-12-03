import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  titlestory: String,
  storycontent1: String,
  storycontent2: String,
  storycontent3: String,
});

export default mongoose.model('About', aboutSchema);
