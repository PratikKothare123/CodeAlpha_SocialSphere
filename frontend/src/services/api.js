import axios from 'axios';

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'http://localhost:5001/api',
  withCredentials: true,
});

// Attach JWT Token Automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('socialsphere_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Global Response Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      'API Error:',
      error.response?.data || error.message
    );

    // Auto logout if token expired
    if (error.response?.status === 401) {
      localStorage.removeItem('socialsphere_token');
    }

    return Promise.reject(error);
  }
);

// ===============================
// AUTH APIs
// ===============================

export const authApi = {
  signup: (data) => api.post('/auth/signup', data),

  login: (data) => api.post('/auth/login', data),

  me: () => api.get('/auth/me'),

  logout: () => {
    localStorage.removeItem('socialsphere_token');
  },
};

// ===============================
// USER APIs
// ===============================

export const userApi = {
  explore: (q = '') =>
    api.get(
      `/users/explore${
        q ? `?q=${encodeURIComponent(q)}` : ''
      }`
    ),

  profile: (username) =>
    api.get(`/users/${username}`),

  updateProfile: (formData) =>
    api.patch('/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  toggleFollow: (id) =>
    api.post(`/users/${id}/follow`),

  followers: (id) =>
    api.get(`/users/${id}/followers`),

  following: (id) =>
    api.get(`/users/${id}/following`),
};

// ===============================
// POST APIs
// ===============================

export const postApi = {
  feed: (page = 1) =>
    api.get(`/posts/feed?page=${page}`),

  get: (id) =>
    api.get(`/posts/${id}`),

  create: (formData) =>
    api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  update: (id, formData) =>
    api.patch(`/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  remove: (id) =>
    api.delete(`/posts/${id}`),

  like: (id) =>
    api.post(`/posts/${id}/like`),

  byUser: (userId) =>
    api.get(`/posts/user/${userId}`),
};

// ===============================
// COMMENT APIs
// ===============================

export const commentApi = {
  list: (postId) =>
    api.get(`/comments/post/${postId}`),

  create: (postId, data) =>
    api.post(`/comments/post/${postId}`, data),

  remove: (id) =>
    api.delete(`/comments/${id}`),
};