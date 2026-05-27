import { Router } from 'express';
import { addComment, deleteComment, getComments } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { commentRules } from '../validators/postValidators.js';

const router = Router();

router.use(protect);
router.get('/post/:postId', getComments);
router.post('/post/:postId', commentRules, validate, addComment);
router.delete('/:id', deleteComment);

export default router;

