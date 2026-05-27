import { Router } from 'express';
import { exploreUsers, getFollowers, getFollowing, getProfile, toggleFollow, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { validate } from '../middleware/validate.js';
import { profileRules } from '../validators/postValidators.js';

const router = Router();

router.use(protect);
router.get('/explore', exploreUsers);
router.patch('/profile', upload.single('profilePicture'), profileRules, validate, updateProfile);
router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);
router.post('/:id/follow', toggleFollow);
router.get('/:username', getProfile);

export default router;
