import { Request, Response } from 'express';
import Project from '../models/Project';

const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const addProject = async (req: Request, res: Response) => {
  const { name, description, technologies, repoLink, liveLink, imageUrl } = req.body;

  if (!name || !description || !technologies || !imageUrl) {
    res.status(400).json({ message: 'Please enter all required fields: name, description, technologies, imageUrl' });
    return;
  }

  try {
    const project = await Project.create({ name, description, technologies, repoLink, liveLink, imageUrl });
    res.status(201).json(project);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const updateProject = async (req: Request, res: Response) => {
  const { name, description, technologies, repoLink, liveLink, imageUrl } = req.body;

  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.name = name || project.name;
      project.description = description || project.description;
      project.technologies = technologies || project.technologies;
      project.repoLink = repoLink || project.repoLink;
      project.liveLink = liveLink || project.liveLink;
      project.imageUrl = imageUrl || project.imageUrl;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await Project.deleteOne({ _id: project._id });
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getProjects, addProject, updateProject, deleteProject };
