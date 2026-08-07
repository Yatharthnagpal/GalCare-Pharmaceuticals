import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
import {
  updateLeadStatusSchema,
  createJobSchema,
  updateJobSchema,
  createNewsSchema,
  updateNewsSchema,
  createManufacturingSchema,
  updateManufacturingSchema,
  createPartnerLogoSchema,
} from '../validators';
import multer from 'multer';
import { uploadPublicImage, deleteFile } from '../services/storage.service';

const router = Router();

// All admin routes require authentication + admin role
router.use(authenticate as any, requireAdmin as any);

// ─────────────────── LEADS ───────────────────

router.get('/leads', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, outreachStatus, search } = req.query;

    const where: any = {};
    if (category) where.category = String(category);
    if (outreachStatus) where.outreachStatus = String(outreachStatus);
    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { email: { contains: String(search), mode: 'insensitive' } },
        { company: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: leads });
  } catch (error) {
    next(error);
  }
});

router.patch('/leads/:id/status', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = updateLeadStatusSchema.parse(req.body);
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { outreachStatus: data.outreachStatus },
    });
    res.json({ success: true, data: updatedLead });
  } catch (error) {
    next(error);
  }
});

router.get('/leads/export-csv', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Build CSV manually — no external dependency needed
    const headers = ['Name', 'Company', 'Email', 'Phone', 'Interest Area', 'Status', 'Date'];
    const escapeCSV = (val: string) => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };

    const rows = leads.map((l) =>
      [
        escapeCSV(l.name),
        escapeCSV(l.company || ''),
        escapeCSV(l.email),
        escapeCSV(l.phone || ''),
        escapeCSV(l.interestArea),
        escapeCSV(l.outreachStatus),
        escapeCSV(l.createdAt.toISOString()),
      ].join(',')
    );

    const csv = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=galcare-leads.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
});

// ─────────────────── JOBS ───────────────────

router.post('/jobs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createJobSchema.parse(req.body);
    const job = await prisma.job.create({ data });
    res.json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
});

router.put('/jobs/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = updateJobSchema.parse(req.body);
    const job = await prisma.job.update({ where: { id }, data });
    res.json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
});

router.delete('/jobs/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.job.delete({ where: { id } });
    res.json({ success: true, message: 'Job deleted' });
  } catch (error) {
    next(error);
  }
});

// ─────────────────── JOB APPLICATIONS ───────────────────

router.get('/applications', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apps = await prisma.jobApplication.findMany({
      include: { job: { select: { title: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: apps });
  } catch (error) {
    next(error);
  }
});

// ─────────────────── NEWS ARTICLES ───────────────────

router.post('/news', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createNewsSchema.parse(req.body);
    const article = await prisma.newsArticle.create({ data });
    res.json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
});

router.put('/news/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = updateNewsSchema.parse(req.body);
    const article = await prisma.newsArticle.update({ where: { id }, data });
    res.json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
});

router.delete('/news/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.newsArticle.delete({ where: { id } });
    res.json({ success: true, message: 'Article deleted' });
  } catch (error) {
    next(error);
  }
});

// ─────────────────── MANUFACTURING CAPABILITIES ───────────────────

router.post('/manufacturing', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createManufacturingSchema.parse(req.body);
    const cap = await prisma.manufacturingCapability.create({ data });
    res.json({ success: true, data: cap });
  } catch (error) {
    next(error);
  }
});

router.put('/manufacturing/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = updateManufacturingSchema.parse(req.body);
    const cap = await prisma.manufacturingCapability.update({ where: { id }, data });
    res.json({ success: true, data: cap });
  } catch (error) {
    next(error);
  }
});

router.delete('/manufacturing/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.manufacturingCapability.delete({ where: { id } });
    res.json({ success: true, message: 'Capability deleted' });
  } catch (error) {
    next(error);
  }
});

// ─────────────────── PARTNER LOGOS ───────────────────

const uploadLogo = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/svg+xml', 'image/webp', 'image/jpeg'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PNG, SVG, WEBP, and JPEG files are allowed'));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

router.post('/partners', uploadLogo.single('logo'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Logo file is required' });
    }

    const { name, sortOrder } = createPartnerLogoSchema.parse(req.body);
    const filename = `${Date.now()}-${req.file.originalname}`;
    const imageUrl = await uploadPublicImage(req.file.buffer, filename, 'partners');

    const partner = await prisma.partnerLogo.create({
      data: {
        name,
        imageUrl,
        sortOrder,
      },
    });
    res.json({ success: true, data: partner });
  } catch (error) {
    next(error);
  }
});

router.delete('/partners/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const partner = await prisma.partnerLogo.findUnique({ where: { id } });
    if (partner) {
      // Try to delete from storage — non-blocking
      await deleteFile('public-media', partner.imageUrl).catch(() => {});
      await prisma.partnerLogo.delete({ where: { id } });
    }
    res.json({ success: true, message: 'Partner deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
