/**
 * Sales Service (Cursor-Based Pagination with Sorting)
 * Business logic for sales data operations
 * Uses cursor-based pagination for efficient large dataset handling
 */

const Sale = require('../models/Sale');
const config = require('../utils/config');

// Cache for stats (refresh every 30 seconds)
let statsCache = {
    data: null,
    timestamp: 0,
    query: null,
};
const CACHE_TTL = 30000;

// Sort field mapping
const SORT_FIELD_MAP = {
    'date': 'Date',
    'customerName': 'Customer Name',
    'quantity': 'Quantity',
    'finalAmount': 'Final Amount',
};

/**
 * Build MongoDB filter query from request parameters
 */
const buildFilterQuery = (filters) => {
    const query = {};

    if (filters.search) {
        query.$or = [
            { 'Customer Name': { $regex: filters.search, $options: 'i' } },
        ];
        if (/^\d+$/.test(filters.search)) {
            query.$or.push({ 'Phone Number': parseInt(filters.search, 10) });
        }
    }

    if (filters.region) query['Customer Region'] = filters.region;
    if (filters.gender) query['Gender'] = filters.gender;
    if (filters.customerType) query['Customer Type'] = filters.customerType;
    if (filters.category) query['Product Category'] = filters.category;
    if (filters.paymentMethod) query['Payment Method'] = filters.paymentMethod;
    if (filters.orderStatus) query['Order Status'] = filters.orderStatus;
    if (filters.deliveryType) query['Delivery Type'] = filters.deliveryType;

    if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
        query['Age'] = {};
        if (filters.ageMin !== undefined) query['Age'].$gte = parseInt(filters.ageMin, 10);
        if (filters.ageMax !== undefined) query['Age'].$lte = parseInt(filters.ageMax, 10);
    }

    if (filters.tags) {
        query['Tags'] = { $regex: filters.tags, $options: 'i' };
    }

    if (filters.dateFrom || filters.dateTo) {
        query['Date'] = {};
        if (filters.dateFrom) query['Date'].$gte = new Date(filters.dateFrom);
        if (filters.dateTo) query['Date'].$lte = new Date(filters.dateTo);
    }

    return query;
};

/**
 * Calculate stats with caching
 */
const calculateStats = async (query) => {
    const queryKey = JSON.stringify(query);
    const now = Date.now();

    if (statsCache.data && statsCache.query === queryKey && (now - statsCache.timestamp) < CACHE_TTL) {
        return statsCache.data;
    }

    const stats = await Sale.aggregate([
        { $match: query },
        {
            $group: {
                _id: null,
                totalUnitsSold: { $sum: '$Quantity' },
                totalAmount: { $sum: '$Total Amount' },
                totalFinalAmount: { $sum: '$Final Amount' },
                transactionCount: { $sum: 1 },
            },
        },
    ]);

    const result = stats.length === 0 ? {
        totalUnitsSold: 0,
        totalAmount: 0,
        totalDiscount: 0,
        transactionCount: 0,
    } : {
        totalUnitsSold: stats[0].totalUnitsSold,
        totalAmount: stats[0].totalAmount,
        totalDiscount: stats[0].totalAmount - stats[0].totalFinalAmount,
        transactionCount: stats[0].transactionCount,
    };

    statsCache = { data: result, timestamp: now, query: queryKey };
    return result;
};

/**
 * Transform MongoDB document to frontend format
 */
const transformItem = (item) => ({
    _id: item._id.toString(),
    transactionId: item['Transaction ID'],
    date: item['Date'],
    customerId: item['Customer ID'],
    customerName: item['Customer Name'],
    phoneNumber: String(item['Phone Number']),
    gender: item['Gender'],
    age: item['Age'],
    customerRegion: item['Customer Region'],
    customerType: item['Customer Type'],
    productId: item['Product ID'],
    productName: item['Product Name'],
    brand: item['Brand'],
    productCategory: item['Product Category'],
    tags: item['Tags'] ? item['Tags'].split(',').map(t => t.trim()) : [],
    quantity: item['Quantity'],
    pricePerUnit: item['Price per Unit'],
    discountPercentage: item['Discount Percentage'],
    totalAmount: item['Total Amount'],
    finalAmount: item['Final Amount'],
    paymentMethod: item['Payment Method'],
    orderStatus: item['Order Status'],
    deliveryType: item['Delivery Type'],
    storeId: item['Store ID'],
    storeLocation: item['Store Location'],
    salespersonId: item['Salesperson ID'],
    employeeName: item['Employee Name'],
});

/**
 * Get sales data with cursor-based pagination and sorting
 */
const getSales = async (params = {}) => {
    const {
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
        sortBy = 'date',
        sortOrder = 'desc',
        cursor,
        direction = 'next',
        limit = config.pagination.defaultLimit,
    } = params;

    const baseQuery = buildFilterQuery({
        search, region, gender, customerType, ageMin, ageMax,
        category, tags, paymentMethod, orderStatus, deliveryType,
        dateFrom, dateTo,
    });

    const limitNum = Math.min(
        parseInt(limit, 10) || config.pagination.defaultLimit,
        config.pagination.maxLimit
    );

    // For cursor-based pagination, we must sort by _id for consistent ordering
    // Other sort fields are applied first, but _id ensures stable pagination
    const sortDirection = direction === 'prev' ? 1 : -1; // Default: descending (newest first)

    // Build cursor query - always based on _id
    let query = { ...baseQuery };

    if (cursor) {
        const { ObjectId } = require('mongoose').Types;
        const cursorOp = sortDirection === -1 ? '$lt' : '$gt';
        query._id = { [cursorOp]: new ObjectId(cursor) };
    }

    // Sort by _id only for consistent cursor pagination
    let data = await Sale.find(query)
        .sort({ _id: sortDirection })
        .limit(limitNum + 1)
        .lean()
        .exec();

    // Check if there are more results
    const hasMore = data.length > limitNum;
    if (hasMore) {
        data = data.slice(0, limitNum);
    }

    // For 'prev' direction, reverse the results
    if (direction === 'prev') {
        data = data.reverse();
    }

    // Get total count and stats
    const shouldFetchStats = !cursor || !statsCache.data;
    const [totalItems, stats] = await Promise.all([
        shouldFetchStats ? Sale.countDocuments(baseQuery).exec() : Promise.resolve(null),
        shouldFetchStats ? calculateStats(baseQuery) : Promise.resolve(statsCache.data),
    ]);

    // Build cursor info
    const firstItem = data[0];
    const lastItem = data[data.length - 1];

    // Calculate total pages
    const total = totalItems || statsCache?.data?.transactionCount || 0;
    const totalPages = Math.ceil(total / limitNum);

    return {
        data: data.map(transformItem),
        pagination: {
            nextCursor: hasMore && lastItem ? lastItem._id.toString() : null,
            prevCursor: firstItem && cursor ? firstItem._id.toString() : null,
            hasNextPage: direction === 'next' ? hasMore : true,
            hasPrevPage: direction === 'prev' ? hasMore : !!cursor,
            itemsPerPage: limitNum,
            totalItems: total,
            totalPages,
        },
        stats: stats || { totalUnitsSold: 0, totalAmount: 0, totalDiscount: 0, transactionCount: 0 },
    };
};

module.exports = {
    getSales,
    buildFilterQuery,
    calculateStats,
};
