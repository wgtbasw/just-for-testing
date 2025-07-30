import { Request, Response } from 'express';
import Task from '../models/Task';

// Extend Request to include user property
interface AuthRequest extends Request {
  user?: { id: number };
}

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user!.id } });
    res.json(tasks);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, dueDate, priority, projectId } = req.body;
  try {
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      priority,
      projectId,
      userId: req.user!.id,
    });
    res.json(newTask);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { title, description, dueDate, priority, status, projectId } = req.body;
  try {
    let task = await Task.findOne({ where: { id: req.params.id, userId: req.user!.id } });
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.projectId = projectId || task.projectId;

    await task.save();
    res.json(task);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user!.id } });
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    await task.destroy();
    res.json({ msg: 'Task removed' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
