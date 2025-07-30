import { Request, Response } from 'express';
import Project from '../models/Project';

// Extend Request to include user property
interface AuthRequest extends Request {
  user?: { id: number };
}

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const projects = await Project.findAll({ where: { userId: req.user!.id } });
    res.json(projects);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const createProject = async (req: AuthRequest, res: Response) => {
  const { name } = req.body;
  try {
    const newProject = await Project.create({
      name,
      userId: req.user!.id,
    });
    res.json(newProject);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  const { name } = req.body;
  try {
    let project = await Project.findOne({ where: { id: req.params.id, userId: req.user!.id } });
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    project.name = name || project.name;

    await project.save();
    res.json(project);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const project = await Project.findOne({ where: { id: req.params.id, userId: req.user!.id } });
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    await project.destroy();
    res.json({ msg: 'Project removed' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
