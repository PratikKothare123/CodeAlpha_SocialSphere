import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('socialsphere_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me')
};

export const userApi = {
  explore: (q = '') => api.get(`/users/explore${q ? `?q=${encodeURIComponent(q)}` : ''}`),
  profile: (username) => api.get(`/users/${username}`),
  updateProfile: (formData) => api.patch('/users/profile', formData),
  toggleFollow: (id) => api.post(`/users/${id}/follow`),
  followers: (id) => api.get(`/users/${id}/followers`),
  following: (id) => api.get(`/users/${id}/following`)
};

export const postApi = {
  feed: (page = 1) => api.get(`/posts/feed?page=${page}`),
  get: (id) => api.get(`/posts/${id}`),
  create: (formData) => api.post('/posts', formData),
  update: (id, formData) => api.patch(`/posts/${id}`, formData),
  remove: (id) => api.delete(`/posts/${id}`),
  like: (id) => api.post(`/posts/${id}/like`),
  byUser: (userId) => api.get(`/posts/user/${userId}`)
};

export const commentApi = {
  list: (postId) => api.get(`/comments/post/${postId}`),
  create: (postId, data) => api.post(`/comments/post/${postId}`, data),
  remove: (id) => api.delete(`/comments/${id}`)
};
