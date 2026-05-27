import { Router } from 'express';
import { login, logout, me, signup } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { loginRules, signupRules } from '../validators/authValidators.js';

const router = Router();

router.post('/signup', signupRules, validate, signup);
router.post('/login', loginRules, validate, login);
router.post('/logout', protect, logout);
router.get('/me', protect, me);

export default router;
