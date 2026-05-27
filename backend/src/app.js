import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const parseOrigins = (value = '') =>
  value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const allowedOrigins = [
  'http://localhost:5173',
  'https://pratiksocialsphere.vercel.app',
  'https://pratiksocialsphere-2y6wmyqx0-pratiks-projects-7b933d8c.vercel.app',
  'https://pratiksocialsphere-co8rkytly-pratiks-projects-7b933d8c.vercel.app',
  ...parseOrigins(process.env.CLIENT_URL),
  ...parseOrigins(process.env.CLIENT_URLS),
];

const vercelPreviewOrigin =
  /^https:\/\/pratiksocialsphere-[a-z0-9]+-pratiks-projects-7b933d8c\.vercel\.app$/;

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || vercelPreviewOrigin.test(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
};

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));

  app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'SocialSphere API' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/comments', commentRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
