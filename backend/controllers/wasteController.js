const WasteRequest = require('../models/WasteRequest');
const User = require('../models/User');

// @desc    Create waste request
// @route   POST /api/waste
exports.createWasteRequest = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      wasteType,
      estimatedWeight,
      frequency,
      preferredPickup,
      description,
      paymentMethod,
      upiId,
      bankDetails: bankDetailsStr
    } = req.body;

    // Parse bank details if it comes as a string (from FormData)
    let bankDetails = null;
    if (bankDetailsStr) {
      try {
        bankDetails = typeof bankDetailsStr === 'string' ? JSON.parse(bankDetailsStr) : bankDetailsStr;
      } catch (e) {
        console.error('Error parsing bank details:', e);
      }
    }

    // Add image path if uploaded
    const image = req.file ? req.file.path : null;

    const wasteRequest = await WasteRequest.create({
      user: req.user ? req.user._id : null, // Support anonymous submissions
      name,
      phone,
      email,
      address,
      wasteType,
      estimatedWeight,
      frequency,
      preferredPickup,
      description,
      image,
      paymentMethod,
      upiId,
      bankDetails
    });

    res.status(201).json({
      success: true,
      message: 'Waste request submitted successfully! We will contact you soon.',
      data: wasteRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all waste requests for a user
// @route   GET /api/waste/my-requests
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await WasteRequest.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single waste request
// @route   GET /api/waste/:id
exports.getWasteRequest = async (req, res) => {
  try {
    const request = await WasteRequest.findById(req.params.id)
      .populate('user', 'name email phone');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Waste request not found'
      });
    }

    // Check if user owns this request or is admin
    if (request.user && request.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this request'
      });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update waste request status (Admin only)
// @route   PUT /api/waste/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const { status, actualWeight, pricePerKg } = req.body;

    const request = await WasteRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Waste request not found'
      });
    }

    request.status = status;

    if (actualWeight) {
      request.actualWeight = actualWeight;
    }

    if (pricePerKg) {
      request.pricePerKg = pricePerKg;
      request.totalAmount = actualWeight * pricePerKg;
    }

    if (status === 'collected') {
      request.collectedAt = Date.now();
    }

    if (status === 'completed' && !request.isPaid && request.user) {
      request.isPaid = true;
      request.paidAt = Date.now();

      // Update user earnings
      await User.findByIdAndUpdate(request.user, {
        $inc: {
          totalEarnings: request.totalAmount,
          totalWasteCollected: request.actualWeight
        }
      });
    }

    await request.save();

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all waste requests (Admin only)
// @route   GET /api/waste/admin/all
exports.getAllRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = status ? { status } : {};

    const requests = await WasteRequest.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await WasteRequest.countDocuments(query);

    res.status(200).json({
      success: true,
      count: requests.length,
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: page,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete waste request
// @route   DELETE /api/waste/:id
exports.deleteWasteRequest = async (req, res) => {
  try {
    const request = await WasteRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Waste request not found'
      });
    }

    // Check if user owns this request or is admin
    if (request.user && request.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this request'
      });
    }

    await request.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Waste request deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add feedback to waste request
// @route   POST /api/waste/:id/feedback
exports.addFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const request = await WasteRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Waste request not found'
      });
    }

    // Check if user owns this request
    if (request.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add feedback to this request'
      });
    }

    // Check if request is completed
    if (request.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only add feedback to completed requests'
      });
    }

    request.feedback = {
      rating,
      comment,
      createdAt: Date.now(),
      isPublic: true,
      isFeatured: true // Auto-feature for immediate visibility
    };

    await request.save();

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get public testimonials
// @route   GET /api/waste/public/testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await WasteRequest.find({
      'feedback.rating': { $exists: true },
      'feedback.isFeatured': true
    })
      .populate('user', 'name')
      .select('feedback user wasteType address createdAt')
      .sort({ 'feedback.createdAt': -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Toggle featured status of feedback
// @route   PUT /api/waste/:id/feature
exports.toggleFeatured = async (req, res) => {
  try {
    const request = await WasteRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Waste request not found'
      });
    }

    if (!request.feedback || !request.feedback.rating) {
      return res.status(400).json({
        success: false,
        message: 'No feedback found for this request'
      });
    }

    request.feedback.isFeatured = !request.feedback.isFeatured;
    
    request.markModified('feedback');
    await request.save();

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
