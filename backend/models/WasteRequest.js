const mongoose = require('mongoose');

const wasteRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow anonymous submissions initially
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  wasteType: {
    type: String,
    required: true,
    enum: ['Vegetable Waste', 'Fruit Waste', 'Cooked Food', 'Bakery Items', 'Dairy Products', 'Mixed Organic', 'Other']
  },
  estimatedWeight: {
    type: Number,
    required: true,
    min: 1
  },
  frequency: {
    type: String,
    enum: ['one-time', 'weekly', 'bi-weekly', 'monthly'],
    default: 'one-time'
  },
  preferredPickup: {
    type: Date
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ['bank', 'upi', 'cash'],
    default: 'cash'
  },
  upiId: {
    type: String
  },
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    accountHolderName: String,
    bankName: String
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'collected', 'completed', 'cancelled'],
    default: 'pending'
  },
  actualWeight: {
    type: Number
  },
  pricePerKg: {
    type: Number
  },
  totalAmount: {
    type: Number
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: {
    type: Date
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String
    },
    createdAt: {
      type: Date
    },
    isPublic: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  collectedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WasteRequest', wasteRequestSchema);
