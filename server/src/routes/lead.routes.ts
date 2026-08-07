import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { createLeadSchema } from '../validators';
import * as emailService from '../services/email.service';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createLeadSchema.parse(req.body);

    const lead = await prisma.lead.create({
      data: {
        ...data,
        outreachStatus: 'NEW_UNCONTACTED',
      },
    });

    // Fire-and-forget emails
    (async () => {
      try {
        if (data.category === 'THIRD_PARTY_MANUFACTURING') {
          await emailService.notifyTeamNew3rdPartyRequest(lead);
        } else {
          await emailService.notifyTeamNewLead(lead);
        }
        await emailService.sendAutoResponderToLeadSubmitter(lead.email, lead.name, lead.category);
      } catch (e) {
        console.error('Failed to send email notifications for lead:', e);
      }
    })();

    res.json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
