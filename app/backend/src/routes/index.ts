import { Router } from 'express';
import teamsRouter from './teams.router';
import userRouter from './user.router';
import matchesRouter from './matches.router';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
