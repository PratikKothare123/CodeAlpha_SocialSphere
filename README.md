# SocialSphere 🚀

A full-stack social media platform built using the MERN stack where users can create profiles, share posts, like and comment on posts, follow other users, and explore a dynamic social feed with secure JWT authentication.

---

# 🌐 Live Demo

## Frontend
https://your-frontend.vercel.app

## Backend API
https://socialsphere-4mts.onrender.com

> Replace frontend URL with your deployed Vercel URL.

---

# ✨ Features

## 🔐 Authentication
- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Persistent Login

## 👤 User Profiles
- View Profile
- Edit Profile
- Upload Profile Image
- Follow / Unfollow Users
- Followers & Following Count

## 📝 Posts
- Create Post
- Upload Images
- Edit/Delete Posts
- Feed System
- Infinite Scroll Ready

## ❤️ Engagement
- Like / Unlike Posts
- Comment on Posts
- Delete Comments

## 🌍 Explore
- Explore Users
- Dynamic Social Feed

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- JWT Authentication
- Multer
- Cloudinary

## Database
- MongoDB Atlas
- Mongoose

## Deployment
- Frontend → Vercel
- Backend → Render

---

# 📂 Folder Structure

```bash
SocialSphere/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── assets/
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── config/
│   │   └── utils/
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=5001

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Frontend `.env`

```env
VITE_API_URL=https://socialsphere-4mts.onrender.com/api
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/socialsphere.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

# ▶️ Run Project Locally

## Start Backend

```bash
cd backend
npm run dev
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# 🌐 API Endpoints

## Auth Routes

```bash
/api/auth/signup
/api/auth/login
/api/auth/me
```

---

## User Routes

```bash
/api/users/explore
/api/users/:username
/api/users/:id/follow
```

---

## Post Routes

```bash
/api/posts
/api/posts/feed
/api/posts/:id
/api/posts/:id/like
```

---

## Comment Routes

```bash
/api/comments/post/:postId
```

---

# 📸 Screenshots

Add screenshots here after deployment.

Example:

```md
![Home Page](./screenshots/home.png)
```

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected APIs
- CORS Configuration
- Environment Variables
- Secure File Uploads

---

# 📦 Deployment

## Frontend Deployment
- Vercel

## Backend Deployment
- Render

## Database
- MongoDB Atlas

## Image Hosting
- Cloudinary

---

# 🧠 Future Improvements

- Real-time Chat
- Notifications
- Stories Feature
- Dark Mode
- Reels Upload
- Search Functionality
- Bookmark Posts
- Admin Dashboard

---

# 🤝 Contributing

Contributions are welcome!

Fork the repository and submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

## Pratik Kothare

Full Stack Developer 🚀

### 🌐 Live Project
https://your-frontend.vercel.app

### 💻 GitHub
https://github.com/yourusername