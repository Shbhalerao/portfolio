import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  responsibilities: [
    {
      type: String,
    }
  ],
  technologies: [
    {
      type: String,
    }
  ],
}, { timestamps: true });

const Experience = mongoose.model('Experience', ExperienceSchema);
export default Experience;
