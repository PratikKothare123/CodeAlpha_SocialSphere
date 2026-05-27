import { Router } from 'express';
import { createPost, deletePost, getFeed, getPost, getUserPosts, toggleLike, updatePost } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { validate } from '../middleware/validate.js';
import { postRules } from '../validators/postValidators.js';

const router = Router();

router.use(protect);
router.get('/feed', getFeed);
router.get('/user/:userId', getUserPosts);
router.get('/:id', getPost);
router.post('/', upload.single('image'), postRules, validate, createPost);
router.patch('/:id', upload.single('image'), updatePost);
router.delete('/:id', deletePost);
router.post('/:id/like', toggleLike);

export default router;

