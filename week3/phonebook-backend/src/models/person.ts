import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

if (!url) {
  console.log("No url found from .env, critical failure.");
  process.exit();
}

mongoose.connect(url)
  .then(() => {
  console.log("Db connection succesful!");
  }).catch(err => {
  console.log("Error connecting to mongo, ",err);
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true
  }
});

personSchema.set('toJSON', {
  transform: (_doc, ret) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret._v;
  } 
});

export const Person = mongoose.model('Person', personSchema);