/**
 * Environment Configuration
 * Centralized configuration management for the backend service
 */

require('dotenv').config();

const config = {
  // MongoDB Configuration
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/prod',
    dbName: process.env.MONGODB_DB_NAME || 'prod',
  },

  // Server Configuration
  server: {
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || 'development',
  },

  // Pagination Defaults
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
};

module.exports = config;
