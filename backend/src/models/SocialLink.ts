import mongoose from 'mongoose';

const SocialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  iconClass: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const SocialLink = mongoose.model('SocialLink', SocialLinkSchema);
export default SocialLink;
