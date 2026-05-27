import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadImage } from '../services/uploadService.js';

const populatePost = (query) => query.populate('author', 'name username profilePicture');

const withCommentCounts = async (posts) => {
  const counts = await Comment.aggregate([
    { $match: { post: { $in: posts.map((post) => post._id) } } },
    { $group: { _id: '$post', count: { $sum: 1 } } }
  ]);
  const countMap = new Map(counts.map((item) => [item._id.toString(), item.count]));
  return posts.map((post) => ({ ...post.toObject(), commentsCount: countMap.get(post._id.toString()) || 0 }));
};

export const createPost = asyncHandler(async (req, res) => {
  const image = req.file ? await uploadImage(req.file.buffer, 'socialsphere/posts') : '';
  const post = await Post.create({ caption: req.body.caption, image, author: req.user._id });
  const populated = await populatePost(Post.findById(post._id));
  res.status(201).json({ post: { ...populated.toObject(), commentsCount: 0 } });
});

export const getFeed = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 30);
  const authors = [...req.user.following, req.user._id];

  const posts = await populatePost(
    Post.find({ author: { $in: authors } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
  );

  res.json({ posts: await withCommentCounts(posts), page, hasMore: posts.length === limit });
});

export const getPost = asyncHandler(async (req, res) => {
  const post = await populatePost(Post.findById(req.params.id));
  if (!post) throw new ApiError(404, 'Post not found');
  const [postWithCount] = await withCommentCounts([post]);
  res.json({ post: postWithCount });
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ApiError(404, 'Post not found');
  if (!post.author.equals(req.user._id)) throw new ApiError(403, 'You can only edit your own posts');

  post.caption = req.body.caption ?? post.caption;
  if (req.file) post.image = await uploadImage(req.file.buffer, 'socialsphere/posts');
  await post.save();

  const populated = await populatePost(Post.findById(post._id));
  const [postWithCount] = await withCommentCounts([populated]);
  res.json({ post: postWithCount });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ApiError(404, 'Post not found');
  if (!post.author.equals(req.user._id)) throw new ApiError(403, 'You can only delete your own posts');

  await Comment.deleteMany({ post: post._id });
  await post.deleteOne();
  res.json({ message: 'Post deleted' });
});

export const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ApiError(404, 'Post not found');

  const liked = post.likes.some((id) => id.equals(req.user._id));
  liked ? post.likes.pull(req.user._id) : post.likes.addToSet(req.user._id);
  await post.save();

  res.json({ liked: !liked, likes: post.likes });
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await populatePost(Post.find({ author: req.params.userId }).sort({ createdAt: -1 }));
  res.json({ posts: await withCommentCounts(posts) });
});

