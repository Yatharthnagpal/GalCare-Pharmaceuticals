import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { createJobApplicationSchema } from '../validators';
import * as emailService from '../services/email.service';
import multer from 'multer';
import { uploadResume } from '../services/storage.service';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'));
    }
  },
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
});

router.post('/apply', upload.single('resume'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createJobApplicationSchema.parse(req.body);

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Resume file is required' });
    }

    // Upload resume to Supabase private bucket
    const filename = `${Date.now()}-${req.file.originalname}`;
    const resumeUrl = await uploadResume(req.file.buffer, filename);

    const application = await prisma.jobApplication.create({
      data: {
        ...data,
        resumeUrl,
      },
    });

    // Get job title for email notification
    const job = await prisma.job.findUnique({ where: { id: data.jobId }, select: { title: true } });

    // Fire-and-forget email notifications
    (async () => {
      try {
        await emailService.notifyTeamNewJobApplication(application, job?.title || 'Unknown Position');
        await emailService.sendAutoResponderToJobApplicant(data.email, data.candidate, job?.title || 'the position');
      } catch (e) {
        console.error('Failed to send job application emails:', e);
      }
    })();

    res.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
