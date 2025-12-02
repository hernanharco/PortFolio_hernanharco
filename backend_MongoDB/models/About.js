import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  title: String,
  description: String,
});

export default mongoose.model('About', aboutSchema);
