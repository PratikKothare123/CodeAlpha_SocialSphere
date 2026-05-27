import './config/env.js';

import { createApp } from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 10000;

// Connect MongoDB
await connectDB();

// Create App
const app = createApp();

// Test Route
app.get('/', (req, res) => {
  res.send('SocialSphere API Running 🚀');
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
