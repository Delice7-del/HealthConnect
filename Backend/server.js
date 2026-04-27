const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');
// Load environment variables
require('dotenv').config({ path: path.join(__dirname, 'config.env') });


// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const healthConditionRoutes = require('./routes/healthConditions');
const clinicRoutes = require('./routes/clinics');
const notificationRoutes = require('./routes/notifications');
const contactRoutes = require('./routes/contact');
const firstAidRoutes = require('./routes/firstAid');
const appointmentRoutes = require('./routes/appointments');
const messageRoutes = require('./routes/messages');
const resourceRoutes = require('./routes/resources');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const { authenticateToken } = require('./middleware/auth');

const app = express();

// DEBUG: Request Logger
app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} ${req.url}`);
  next();
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://yourdomain.com']
    : true, // Allow all origins in development for easier debugging
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the frontend
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/health-conditions', healthConditionRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/first-aid', firstAidRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/resources', resourceRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'HealthConnect API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `API Route ${req.originalUrl} not found`
  });
});

// Serve the frontend for all other routes (Single Page App support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Database connection
const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || process.env.MONGODB_URI_PROD;
    
    if (!dbUri) {
      console.error('CRITICAL: MongoDB URI is missing!');
      console.error('HINT: Set MONGODB_URI in your environment variables.');
      process.exit(1);
    }

    // Check if we're on Render or in production and still using localhost
    const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER;
    if (isProduction && (dbUri.includes('localhost') || dbUri.includes('127.0.0.1'))) {
      console.error('CRITICAL: Localhost MongoDB detected in Production/Render environment!');
      console.error('HINT: You must use a remote MongoDB instance (like MongoDB Atlas) for cloud deployments.');
      console.error('HINT: Update MONGODB_URI in your Render dashboard environment variables.');
      process.exit(1);
    }


    // Mask credentials for safe logging
    const maskedUri = dbUri.replace(/\/\/.*@/, '//****:****@');
    console.log(`[DB] Attempting to connect to MongoDB: ${maskedUri}`);
    
    const conn = await mongoose.connect(dbUri);
    console.log(`[DB] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('CRITICAL: Database connection error occurred!');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error('HINT: This usually means the MongoDB URI is incorrect or the database is not accessible.');
    }
    
    // In production, we want the process to exit so Render can restart it
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Bound to all interfaces (0.0.0.0)`);
    console.log(`API Documentation: http://localhost:${PORT}/api/docs`);
  });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});

startServer();

module.exports = app; 