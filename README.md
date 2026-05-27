# SocialSphere

SocialSphere is a production-ready mini social media platform built with the MERN stack.

## 1. Complete Folder Structure

```text
SocialSphere/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      utils/
      validators/
    package.json
    .env.example
  frontend/
    src/
      components/
      context/
      hooks/
      layouts/
      pages/
      services/
    package.json
    .env.example
  docs/
    DEPLOYMENT.md
    TESTING.md
```

## 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Place secrets manually in `backend/.env`. Never commit `.env`.

## 3. MongoDB Schema/Models

Models live in `backend/src/models`:

- `User.js`: username, name, email, password, bio, profilePicture, followers, following
- `Post.js`: caption, image, author, likes
- `Comment.js`: text, user, post

## 4-9. Express APIs

Backend routes are mounted at `/api`:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/users/explore`
- `GET /api/users/:username`
- `PATCH /api/users/profile`
- `POST /api/users/:id/follow`
- `GET /api/posts/feed`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PATCH /api/posts/:id`
- `DELETE /api/posts/:id`
- `POST /api/posts/:id/like`
- `GET /api/posts/user/:userId`
- `GET /api/comments/post/:postId`
- `POST /api/comments/post/:postId`
- `DELETE /api/comments/:id`

## 10. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Place the backend URL in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 11-14. React App

The frontend includes routed pages, protected routes, persistent auth state, Axios integration, reusable components, profile editing, post CRUD, comments, likes, follow/unfollow, and responsive Tailwind UI.

## 15. Deployment Guide

See `docs/DEPLOYMENT.md`.

## 16. Testing Guide

See `docs/TESTING.md`.

