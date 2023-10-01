import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middleware/Validations';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.autheticateUser,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => UserController.getUserRole(req, res), // criar GetRole
);

export default router;
