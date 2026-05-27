import './config/env.js';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';

const port = process.env.PORT || 5000;

await connectDB();

const app = createApp();

app.listen(port, () => {
  console.log(`SocialSphere API running on port ${port}`);
});
