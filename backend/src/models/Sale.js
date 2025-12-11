/**
 * Sale Model
 * Mongoose schema for sales transactions
 * Field names match the CSV import format (with spaces)
 */

const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    // Transaction Info
    'Transaction ID': {
        type: Number,
        required: true,
        index: true,
    },
    'Date': {
        type: Date,
        required: true,
        index: true,
    },

    // Customer Info
    'Customer ID': {
        type: String,
        required: true,
        index: true,
    },
    'Customer Name': {
        type: String,
        required: true,
    },
    'Phone Number': {
        type: Number,
        required: true,
    },
    'Gender': {
        type: String,
        index: true,
    },
    'Age': {
        type: Number,
        min: 0,
        index: true,
    },
    'Customer Region': {
        type: String,
        index: true,
    },
    'Customer Type': {
        type: String,
        index: true,
    },

    // Product Info
    'Product ID': {
        type: String,
        required: true,
    },
    'Product Name': {
        type: String,
        required: true,
    },
    'Brand': {
        type: String,
    },
    'Product Category': {
        type: String,
        index: true,
    },
    'Tags': {
        type: String,
    },

    // Pricing
    'Quantity': {
        type: Number,
        required: true,
        min: 1,
    },
    'Price per Unit': {
        type: Number,
        required: true,
        min: 0,
    },
    'Discount Percentage': {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    'Total Amount': {
        type: Number,
        required: true,
        min: 0,
    },
    'Final Amount': {
        type: Number,
        required: true,
        min: 0,
    },

    // Order Info
    'Payment Method': {
        type: String,
        index: true,
    },
    'Order Status': {
        type: String,
        index: true,
    },
    'Delivery Type': {
        type: String,
    },

    // Store Info
    'Store ID': {
        type: String,
    },
    'Store Location': {
        type: String,
        index: true,
    },
    'Salesperson ID': {
        type: String,
    },
    'Employee Name': {
        type: String,
    },
}, {
    timestamps: false,
    collection: 'main',
    strict: false,
});

// Compound indexes for common queries
saleSchema.index({ 'Customer Region': 1, 'Date': -1 });
saleSchema.index({ 'Product Category': 1, 'Date': -1 });

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
