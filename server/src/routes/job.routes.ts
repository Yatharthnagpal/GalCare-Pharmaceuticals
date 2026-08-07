import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
});

export default router;
