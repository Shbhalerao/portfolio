import { Request, Response } from 'express';
import Skill from '../models/Skill';

const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find({});
    res.json(skills);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const addSkill = async (req: Request, res: Response) => {
  const { name, iconClass } = req.body;

  if (!name || !iconClass) {
    res.status(400).json({ message: 'Please enter all fields' });
    return;
  }

  try {
    const skill = await Skill.create({ name, iconClass });
    res.status(201).json(skill);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateSkill = async (req: Request, res: Response) => {
  const { name, iconClass } = req.body;

  try {
    const skill = await Skill.findById(req.params.id);

    if (skill) {
      skill.name = name || skill.name;
      skill.iconClass = iconClass || skill.iconClass;

      const updatedSkill = await skill.save();
      res.json(updatedSkill);
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (skill) {
      await Skill.deleteOne({ _id: skill._id });
      res.json({ message: 'Skill removed' });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getSkills, addSkill, updateSkill, deleteSkill };
