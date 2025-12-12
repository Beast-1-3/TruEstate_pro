/**
 * Backend Server Entry Point
 * Express.js server with MongoDB and API routes
 */

const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const { connectDB } = require('./utils/mongodb');
const salesRoutes = require('./routes/salesRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: config.server.env,
    });
});

// API Routes
app.use('/api/sales', salesRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: config.server.env === 'development' ? err.message : 'Something went wrong',
    });
});

// Start server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start Express server
        const PORT = config.server.port;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📊 Environment: ${config.server.env}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
