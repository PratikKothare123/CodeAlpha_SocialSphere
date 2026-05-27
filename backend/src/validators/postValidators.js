import { body } from 'express-validator';

export const postRules = [
  body('caption').trim().isLength({ min: 1, max: 1000 }).withMessage('Caption must be 1-1000 characters')
];

export const commentRules = [
  body('text').trim().isLength({ min: 1, max: 500 }).withMessage('Comment must be 1-500 characters')
];

export const profileRules = [
  body('name').optional().trim().isLength({ max: 60 }).withMessage('Name must be 60 characters or less'),
  body('bio').optional().trim().isLength({ max: 160 }).withMessage('Bio must be 160 characters or less')
];

