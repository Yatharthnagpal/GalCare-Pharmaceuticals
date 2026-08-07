import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const news = await prisma.newsArticle.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: news });
  } catch (error) {
    next(error);
  }
});

export default router;
