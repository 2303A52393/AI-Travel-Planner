const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trips');
const bookingRoutes = require('./routes/bookings');
const contactRoutes = require('./routes/contact');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

// Utility to check DB connection
const checkDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database not connected',
      error: 'The server is currently unable to reach the database. Please ensure MONGO_URI is correctly configured in your environment variables.',
      status: mongoose.connection.readyState
    });
  }
  next();
};

app.get('/', (req, res) => {
  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized',
  };
  res.json({
    message: 'Travel Planner API running!',
    database: dbStatus[mongoose.connection.readyState] || 'unknown',
    uri_configured: !!process.env.MONGO_URI
  });
});

// Middleware for routes that require database
app.use('/api', checkDbConnection);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('❌ MONGO_URI is not defined in environment variables');
} else {
  console.log(`📡 Attempting to connect to MongoDB... (URI length: ${mongoURI.length})`);
}

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Starting server without MongoDB functionality...');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000} (Limited Mode)`);
    });
  });
