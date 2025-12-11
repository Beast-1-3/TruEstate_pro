/**
 * Sales Controller
 * Handles HTTP request/response for sales endpoints
 */

const salesService = require('../services/salesService');

/**
 * Get sales data with filtering and cursor-based pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getSales = async (req, res) => {
    try {
        const {
            // Search
            search,
            // Filters
            region,
            gender,
            customerType,
            ageMin,
            ageMax,
            category,
            tags,
            paymentMethod,
            orderStatus,
            deliveryType,
            dateFrom,
            dateTo,
            // Sorting
            sortBy,
            sortOrder,
            // Cursor-based pagination
            cursor,
            direction,
            limit,
        } = req.query;

        const result = await salesService.getSales({
            search,
            region,
            gender,
            customerType,
            ageMin,
            ageMax,
            category,
            tags,
            paymentMethod,
            orderStatus,
            deliveryType,
            dateFrom,
            dateTo,
            sortBy,
            sortOrder,
            cursor,
            direction,
            limit,
        });

        res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch sales data',
            message: error.message,
        });
    }
};

module.exports = {
    getSales,
};
