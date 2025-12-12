/**
 * Sales Routes
 * API endpoints for sales operations
 */

const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

/**
 * GET /api/sales
 * Fetch sales data with optional filtering, sorting, and pagination
 *
 * Query Parameters:
 * - search: Search by customer name or phone number
 * - region: Filter by customer region (East, Central, North, South, West)
 * - gender: Filter by gender (Male, Female)
 * - customerType: Filter by customer type (New, Returning, Loyal)
 * - ageMin: Minimum age filter
 * - ageMax: Maximum age filter
 * - category: Filter by product category (Beauty, Electronics, Clothing)
 * - tags: Filter by tags (comma-separated)
 * - paymentMethod: Filter by payment method
 * - orderStatus: Filter by order status
 * - deliveryType: Filter by delivery type
 * - dateFrom: Start date filter (YYYY-MM-DD)
 * - dateTo: End date filter (YYYY-MM-DD)
 * - sortBy: Sort field (date, quantity, customerName, finalAmount)
 * - sortOrder: Sort order (asc, desc)
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10, max: 100)
 */
router.get('/', salesController.getSales);

module.exports = router;
