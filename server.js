const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const courseRouter = require('./routes/courseRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/courses', courseRouter);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coursesdb';

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    // Start server only after MongoDB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });
} else {
  // No MongoDB URI provided, start server with in-memory storage only
  console.log('⚠️  No MONGODB_URI found in .env file. Starting server with in-memory storage only...');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT} (in-memory mode)`);
    console.log(`📚 API endpoints available at http://localhost:${PORT}/api/courses`);
  });
}

module.exports = app;

