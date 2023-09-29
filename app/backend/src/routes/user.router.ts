import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middleware/Validations';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.autheticateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
