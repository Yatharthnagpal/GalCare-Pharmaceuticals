import './config/env'; // Load env vars first
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler } from './middleware/error-handler';
import { publicLimiter } from './middleware/rate-limiter';

// Import route modules
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import jobRoutes from './routes/job.routes';
import careerRoutes from './routes/career.routes';
import newsRoutes from './routes/news.routes';
import partnerRoutes from './routes/partner.routes';
import manufacturingRoutes from './routes/manufacturing.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

// Security and utility middlewares
app.use(helmet());

const corsOptions = {
  origin: env.CORS_ORIGIN.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '2mb' }));

// Apply rate limiting to all /api routes by default
app.use('/api', publicLimiter);

// Mount route groups
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/manufacturing', manufacturingRoutes);
app.use('/api/admin', adminRoutes);

// Global error handler MUST be the last middleware
app.use(errorHandler);

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[server]: Galcare API running at http://localhost:${PORT}`);
  console.log(`[server]: Environment: ${env.NODE_ENV}`);
});
