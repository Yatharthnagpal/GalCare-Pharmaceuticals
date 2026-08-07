import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const partners = await prisma.partnerLogo.findMany({
      orderBy: { sortOrder: 'asc' }
    });
    res.json({ success: true, data: partners });
  } catch (error) {
    next(error);
  }
});

export default router;
