import { Router } from 'express';
import teamsRouter from './teams.router';
import userRouter from './user.router';

const router = Router();

router.use('/login', userRouter);
router.use('/teams', teamsRouter);

export default router;
