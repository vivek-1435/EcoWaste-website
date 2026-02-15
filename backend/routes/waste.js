const express = require('express');
const router = express.Router();
const {
  createWasteRequest,
  getMyRequests,
  getWasteRequest,
  updateStatus,
  getAllRequests,
  deleteWasteRequest,
  addFeedback,
  getTestimonials,
  toggleFeatured
} = require('../controllers/wasteController');
const { protect, adminOnly, optionalAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public/optional auth routes
router.get('/public/testimonials', getTestimonials);
router.post('/', optionalAuth, upload.single('image'), createWasteRequest);

// Protected user routes
router.get('/my-requests', protect, getMyRequests);
router.post('/:id/feedback', protect, addFeedback);
router.get('/:id', protect, getWasteRequest);
router.delete('/:id', protect, deleteWasteRequest);

// Admin only routes
router.get('/admin/all', protect, adminOnly, getAllRequests);
router.put('/:id/status', protect, adminOnly, updateStatus);
router.put('/:id/feature', protect, adminOnly, toggleFeatured);

module.exports = router;
