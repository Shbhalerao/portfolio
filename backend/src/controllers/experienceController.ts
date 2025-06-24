import { Request, Response } from 'express';
import Experience from '../models/Experience';

const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find({});
    experiences.sort((a: any, b: any) => b.startDate.getTime() - a.startDate.getTime());
    res.json(experiences);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const addExperience = async (req: Request, res: Response) => {
  const { title, company, startDate, endDate, responsibilities, technologies } = req.body;

  if (!title || !company || !startDate || !responsibilities) {
    res.status(400).json({ message: 'Please enter all required fields: title, company, startDate, responsibilities' });
    return;
  }

  try {
    const experience = await Experience.create({ title, company, startDate, endDate, responsibilities, technologies });
    res.status(201).json(experience);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateExperience = async (req: Request, res: Response) => {
  const { title, company, startDate, endDate, responsibilities, technologies } = req.body;

  try {
    const experience = await Experience.findById(req.params.id);

    if (experience) {
      experience.title = title || experience.title;
      experience.company = company || experience.company;
      experience.startDate = startDate || experience.startDate;
      experience.endDate = endDate;
      experience.responsibilities = responsibilities || experience.responsibilities;
      experience.technologies = technologies || experience.technologies;

      const updatedExperience = await experience.save();
      res.json(updatedExperience);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteExperience = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (experience) {
      await Experience.deleteOne({ _id: experience._id });
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getExperiences, addExperience, updateExperience, deleteExperience };
