/**
 * MongoDB Connection Utility
 * Mongoose connection setup and management
 */

const mongoose = require('mongoose');
const config = require('./config');

let isConnected = false;

/**
 * Connect to MongoDB
 */
const connectDB = async (retries = 5) => {
    if (isConnected) {
        console.log('📦 Using existing MongoDB connection');
        return;
    }

    while (retries > 0) {
        try {
            const conn = await mongoose.connect(config.mongodb.uri, {
                dbName: config.mongodb.dbName,
                serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
                socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            });

            isConnected = true;
            console.log(`✅ MongoDB connected: ${conn.connection.host}`);
            return;
        } catch (error) {
            console.error(`❌ MongoDB connection error: ${error.message}`);
            retries -= 1;
            console.log(`Checking connection... (${retries} retries left)`);

            if (retries === 0) {
                console.error('❌ Failed to connect to MongoDB. Exiting...');
                process.exit(1);
            }

            // Wait 5 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

/**
 * Disconnect from MongoDB
 */
const disconnectDB = async () => {
    if (!isConnected) return;

    try {
        await mongoose.disconnect();
        isConnected = false;
        console.log('📦 MongoDB disconnected');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error.message);
    }
};

/**
 * Get connection status
 */
const getConnectionStatus = () => isConnected;

module.exports = {
    connectDB,
    disconnectDB,
    getConnectionStatus,
    mongoose,
};
