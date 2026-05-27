import './config/env.js';
import express from 'express';
import cors from 'cors';

import { createApp } from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5001;

// Connect MongoDB
await connectDB();

// Create Express App
const app = createApp();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://your-frontend.vercel.app'
    ],
    credentials: true,
  })
);

// Test Route
app.get("/", (req, res) => {
  res.send("SocialSphere API Running 🚀");
});


// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});