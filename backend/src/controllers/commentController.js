import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('user', 'name username profilePicture').sort({ createdAt: 1 });
  res.json({ comments });
});

export const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) throw new ApiError(404, 'Post not found');

  const comment = await Comment.create({ text: req.body.text, post: post._id, user: req.user._id });
  const populated = await comment.populate('user', 'name username profilePicture');
  res.status(201).json({ comment: populated });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new ApiError(404, 'Comment not found');
  if (!comment.user.equals(req.user._id)) throw new ApiError(403, 'You can only delete your own comments');

  await comment.deleteOne();
  res.json({ message: 'Comment deleted' });
});

