import './config/env.js';
import express from 'express';
import cors from 'cors';

import { createApp } from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 10000;

// Connect MongoDB
await connectDB();

// Create App
const app = createApp();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://pratiksocialsphere-co8rkytly-pratiks-projects-7b933d8c.vercel.app',
    ],
    credentials: true,
  })
);

// Test Route
app.get('/', (req, res) => {
  res.send('SocialSphere API Running 🚀');
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});