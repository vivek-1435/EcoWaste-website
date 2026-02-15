# 🚀 Complete Backend Integration Guide (MERN Stack)

## Table of Contents
1. [Backend Setup](#backend-setup)
2. [Database Configuration](#database-configuration)
3. [API Endpoints](#api-endpoints)
4. [Frontend Integration](#frontend-integration)
5. [Authentication](#authentication)
6. [File Upload](#file-upload)
7. [Testing](#testing)

---

## Backend Setup

### Step 1: Create Backend Folder Structure

```bash
# Create backend folder (separate from frontend)
mkdir backend
cd backend

# Initialize Node.js project
npm init -y
```

### Step 2: Install Required Packages

```bash
# Core dependencies
npm install express mongoose cors dotenv bcryptjs jsonwebtoken

# Additional utilities
npm install multer express-validator nodemon

# For email notifications (optional)
npm install nodemailer

# For payment integration (optional)
npm install razorpay stripe
```

### Step 3: Update package.json

Add this to your `backend/package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## Project Structure

```
project-root/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── WasteRequest.js
│   │   └── Payment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── waste.js
│   │   └── payment.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── wasteController.js
│   │   └── paymentController.js
│   ├── uploads/
│   ├── .env
│   └── server.js
│
└── frontend/ (ecowaste-app)
    └── ...
```

---

## Step-by-Step Implementation

### 1. Create .env file

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecowaste
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Payment Gateway (optional)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 2. Database Configuration

Create `backend/config/db.js`:

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### 3. Create Models

#### User Model (`backend/models/User.js`)

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  totalWasteCollected: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

#### Waste Request Model (`backend/models/WasteRequest.js`)

```javascript
const mongoose = require('mongoose');

const wasteRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
    enum: ['Vegetable Waste', 'Fruit Waste', 'Cooked Food', 'Bakery Items', 'Dairy Products', 'Mixed Organic']
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
    enum: ['bank', 'upi'],
    default: 'bank'
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
  collectedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WasteRequest', wasteRequestSchema);
```

### 4. Create Middleware

#### Auth Middleware (`backend/middleware/auth.js`)

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Admin only middleware
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
};
```

#### Upload Middleware (`backend/middleware/upload.js`)

```javascript
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `waste-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

module.exports = upload;
```

### 5. Create Controllers

#### Auth Controller (`backend/controllers/authController.js`)

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        totalEarnings: user.totalEarnings,
        totalWasteCollected: user.totalWasteCollected,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

#### Waste Controller (`backend/controllers/wasteController.js`)

```javascript
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
      paymentMethod
    } = req.body;

    // Add image path if uploaded
    const image = req.file ? req.file.path : null;

    const wasteRequest = await WasteRequest.create({
      user: req.user._id,
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
      paymentMethod
    });

    res.status(201).json({
      success: true,
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
    if (request.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
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

    if (status === 'completed' && !request.isPaid) {
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
    if (request.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
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
```

### 6. Create Routes

#### Auth Routes (`backend/routes/auth.js`)

```javascript
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
```

#### Waste Routes (`backend/routes/waste.js`)

```javascript
const express = require('express');
const router = express.Router();
const {
  createWasteRequest,
  getMyRequests,
  getWasteRequest,
  updateStatus,
  getAllRequests,
  deleteWasteRequest
} = require('../controllers/wasteController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', protect, upload.single('image'), createWasteRequest);
router.get('/my-requests', protect, getMyRequests);
router.get('/admin/all', protect, adminOnly, getAllRequests);
router.get('/:id', protect, getWasteRequest);
router.put('/:id/status', protect, adminOnly, updateStatus);
router.delete('/:id', protect, deleteWasteRequest);

module.exports = router;
```

### 7. Create Main Server File

Create `backend/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/waste', require('./routes/waste'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

---

## Running the Backend

```bash
# Navigate to backend folder
cd backend

# Create uploads folder
mkdir uploads

# Start the server
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

---

## Testing the API

### Using Thunder Client / Postman

#### 1. Register User
```
POST http://localhost:5000/api/auth/register

Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

#### 2. Login
```
POST http://localhost:5000/api/auth/login

Body (JSON):
{
  "email": "john@example.com",
  "password": "password123"
}

Response will include a token - copy it!
```

#### 3. Create Waste Request
```
POST http://localhost:5000/api/waste

Headers:
Authorization: Bearer YOUR_TOKEN_HERE

Body (form-data):
name: John Doe
phone: 9876543210
email: john@example.com
address: 123 Street, City
wasteType: Vegetable Waste
estimatedWeight: 5
frequency: one-time
paymentMethod: upi
description: Fresh vegetable waste
image: [Select file]
```

#### 4. Get My Requests
```
GET http://localhost:5000/api/waste/my-requests

Headers:
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Next Steps

1. **Install MongoDB** locally or use MongoDB Atlas (cloud)
2. **Test all endpoints** using Postman/Thunder Client
3. **Integrate with frontend** (see FRONTEND_INTEGRATION.md)
4. **Add payment gateway** integration
5. **Add email notifications**
6. **Deploy backend** to Heroku/Railway/Render

---

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
```bash
# Install MongoDB Community Server
# Or use MongoDB Atlas (free cloud database)
# Update MONGODB_URI in .env
```

### Issue: Module not found
```bash
# Make sure you're in backend folder
npm install
```

### Issue: Port already in use
```bash
# Change PORT in .env file
PORT=5001
```

---

## Security Best Practices

1. **Never commit .env file** - Add to .gitignore
2. **Use strong JWT_SECRET** - Use random string generator
3. **Validate all inputs** - Use express-validator
4. **Rate limit APIs** - Use express-rate-limit
5. **Sanitize inputs** - Prevent NoSQL injection
6. **Use HTTPS in production**

---

## Ready for Production?

- [ ] Environment variables configured
- [ ] Database connected
- [ ] All routes tested
- [ ] Error handling implemented
- [ ] Authentication working
- [ ] File upload working
- [ ] CORS configured correctly
- [ ] Security measures in place

**Next:** Check FRONTEND_INTEGRATION.md to connect your React app!
