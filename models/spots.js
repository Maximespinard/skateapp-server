import mongoose from 'mongoose';

const spotSchema = mongoose.Schema({
  name: String,
  image: Object,
  localisation: String,
  category: String,
  description: String,
  hours: String,
  videos: String,
  id: Object,
});

const Spots = mongoose.model('Spots', spotSchema, 'spots');

export default Spots;
