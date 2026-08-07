import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const timestamp = new Date().toISOString();
    const uptime = process.uptime();
    
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.json({ status: 'ok', timestamp, uptime, database: 'connected' });
    } catch (dbError) {
      res.status(503).json({ status: 'error', timestamp, uptime, database: 'disconnected' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
