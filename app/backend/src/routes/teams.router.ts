import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsController.findAllTeams(req, res));

export default router;