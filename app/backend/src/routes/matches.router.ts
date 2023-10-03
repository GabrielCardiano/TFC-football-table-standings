import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import Validations from '../middleware/Validations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findAllMatches(req, res));

// router.use(Validations.validateToken);

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

export default router;
