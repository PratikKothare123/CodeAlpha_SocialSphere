import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken } from '../utils/generateToken.js';

const authPayload = (user) => ({
  user,
  token: generateToken(user._id)
});

export const signup = asyncHandler(async (req, res) => {
  const { name = '', username, email, password } = req.body;
  const exists = await User.findOne({ $or: [{ email }, { username: username.toLowerCase() }] });
  if (exists) throw new ApiError(409, 'Email or username already exists');

  const user = await User.create({ name, username, email, password });
  res.status(201).json(authPayload(user));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  res.json(authPayload(user));
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

export const logout = asyncHandler(async (_req, res) => {
  res.json({ message: 'Logged out' });
});
