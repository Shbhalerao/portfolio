import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [
    {
      type: String,
    }
  ],
  repoLink: {
    type: String,
  },
  liveLink: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
