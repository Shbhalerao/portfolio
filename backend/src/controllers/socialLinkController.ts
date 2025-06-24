import { Request, Response } from 'express';
import SocialLink from '../models/SocialLink';

const getSocialLinks = async (req: Request, res: Response) => {
  try {
    const socialLinks = await SocialLink.find({});
    res.json(socialLinks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const addSocialLink = async (req: Request, res: Response) => {
  const { platform, url, iconClass } = req.body;

  if (!platform || !url || !iconClass) {
    res.status(400).json({ message: 'Please enter all fields' });
    return;
  }

  try {
    const socialLink = await SocialLink.create({ platform, url, iconClass });
    res.status(201).json(socialLink);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateSocialLink = async (req: Request, res: Response) => {
  const { platform, url, iconClass } = req.body;

  try {
    const socialLink = await SocialLink.findById(req.params.id);

    if (socialLink) {
      socialLink.platform = platform || socialLink.platform;
      socialLink.url = url || socialLink.url;
      socialLink.iconClass = iconClass || socialLink.iconClass;

      const updatedSocialLink = await socialLink.save();
      res.json(updatedSocialLink);
    } else {
      res.status(404).json({ message: 'Social link not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSocialLink = async (req: Request, res: Response) => {
  try {
    const socialLink = await SocialLink.findById(req.params.id);

    if (socialLink) {
      await SocialLink.deleteOne({ _id: socialLink._id });
      res.json({ message: 'Social link removed' });
    } else {
      res.status(404).json({ message: 'Social link not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getSocialLinks, addSocialLink, updateSocialLink, deleteSocialLink };
