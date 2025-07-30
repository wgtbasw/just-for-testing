import { Router } from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', auth, getProjects);
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

export default router;
