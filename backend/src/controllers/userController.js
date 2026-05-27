import mongoose from 'mongoose';
import User from '../models/User.js';
import Post from '../models/Post.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadImage } from '../services/uploadService.js';

export const exploreUsers = asyncHandler(async (req, res) => {
  const q = req.query.q?.trim();
  const filter = { _id: { $ne: req.user._id } };
  if (q) filter.$or = [{ username: new RegExp(q, 'i') }, { name: new RegExp(q, 'i') }];

  const users = await User.find(filter).limit(30).sort({ createdAt: -1 });
  res.json({ users });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username.toLowerCase() });
  if (!user) throw new ApiError(404, 'User not found');

  const posts = await Post.find({ author: user._id }).populate('author', 'name username profilePicture').sort({ createdAt: -1 });
  res.json({ user, posts });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updates = {
    name: req.body.name ?? req.user.name,
    bio: req.body.bio ?? req.user.bio
  };

  if (req.file) {
    updates.profilePicture = await uploadImage(req.file.buffer, 'socialsphere/profiles');
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
  res.json({ user });
});

export const toggleFollow = asyncHandler(async (req, res) => {
  const targetId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(targetId)) throw new ApiError(400, 'Invalid user id');
  if (req.user._id.equals(targetId)) throw new ApiError(400, 'You cannot follow yourself');

  const target = await User.findById(targetId);
  if (!target) throw new ApiError(404, 'User not found');

  const alreadyFollowing = req.user.following.some((id) => id.equals(target._id));
  const action = alreadyFollowing ? '$pull' : '$addToSet';

  await User.findByIdAndUpdate(req.user._id, { [action]: { following: target._id } });
  await User.findByIdAndUpdate(target._id, { [action]: { followers: req.user._id } });

  const user = await User.findById(req.user._id);
  const updatedTarget = await User.findById(target._id);
  res.json({ following: !alreadyFollowing, user, target: updatedTarget });
});

export const getFollowers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate('followers', 'name username bio profilePicture followers following');
  if (!user) throw new ApiError(404, 'User not found');
  res.json({ users: user.followers });
});

export const getFollowing = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate('following', 'name username bio profilePicture followers following');
  if (!user) throw new ApiError(404, 'User not found');
  res.json({ users: user.following });
});
