import mongoose from 'mongoose';

const HomepageContentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  aboutText: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
  },
  featuredSkillIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
    }
  ],
  featuredProjectIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    }
  ],
  resumeUrl: {
    type: String,
  },
}, { timestamps: true });

const HomepageContent = mongoose.model('HomepageContent', HomepageContentSchema);
export default HomepageContent;
