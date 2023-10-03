import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import Validations from '../middleware/Validations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findAllMatches(req, res));

router.use(Validations.validateToken);

router.patch(
  '/:id/finish',
  (req: Request, res: Response) => matchesController.updateFinishMatch(req, res),
);

export default router;
