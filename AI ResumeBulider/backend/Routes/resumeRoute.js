import express from 'express';
import { verifyAccessToken } from '../middleware/authMiddleware.js';
import {
  getResume,
  updateResume,
  generateResumePDF
} from '../controllers/resumeController.js';

// Create a new router instance
const router = express.Router();

// Get resume data
// Endpoint: api/resume
// Method: GET
router.route('/').get(verifyAccessToken, getResume);

// Update resume data
// Endpoint: api/resume
// Method: PUT
router.route('/').put(verifyAccessToken, updateResume);

// Generate resume PDF
// Endpoint: api/resume/generate-pdf
// Method: POST
router.route('/generate-pdf').post(verifyAccessToken, generateResumePDF);

export default router;
