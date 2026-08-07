import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const capabilities = await prisma.manufacturingCapability.findMany({
      orderBy: { sortOrder: 'asc' }
    });
    res.json({ success: true, data: capabilities });
  } catch (error) {
    next(error);
  }
});

export default router;
