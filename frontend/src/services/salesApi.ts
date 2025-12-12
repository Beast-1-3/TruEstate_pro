/**
 * Sales API Service
 * Handles communication with the backend API
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Sales item interface
 */
export interface SalesItem {
    _id: string;
    transactionId: number;
    date: string;
    customerId: string;
    customerName: string;
    phoneNumber: string;
    gender: string;
    age: number;
    customerRegion: string;
    customerType: string;
    productId: string;
    productName: string;
    brand: string;
    productCategory: string;
    tags: string[];
    quantity: number;
    pricePerUnit: number;
    discountPercentage: number;
    totalAmount: number;
    finalAmount: number;
    paymentMethod: string;
    orderStatus: string;
    deliveryType: string;
    storeId: string;
    storeLocation: string;
    salespersonId: string;
    employeeName: string;
}

/**
 * Cursor-based pagination info
 */
export interface PaginationInfo {
    nextCursor: string | null;
    prevCursor: string | null;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

/**
 * Sales statistics
 */
export interface SalesStats {
    totalUnitsSold: number;
    totalAmount: number;
    totalDiscount: number;
    transactionCount: number;
}

/**
 * API response structure
 */
export interface SalesResponse {
    success: boolean;
    data: SalesItem[];
    pagination: PaginationInfo;
    stats: SalesStats;
    error?: string;
    message?: string;
}

/**
 * Query parameters for fetching sales
 */
export interface SalesQueryParams {
    search?: string;
    region?: string;
    gender?: string;
    customerType?: string;
    ageMin?: string;
    ageMax?: string;
    category?: string;
    tags?: string;
    paymentMethod?: string;
    orderStatus?: string;
    deliveryType?: string;
    dateFrom?: string;
    dateTo?: string;
    sortBy?: string;
    sortOrder?: string;
    cursor?: string;
    direction?: 'next' | 'prev';
    limit?: string;
}

/**
 * Fetch sales data from the API
 */
export async function fetchSales(params: SalesQueryParams): Promise<SalesResponse> {
    const queryString = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            queryString.append(key, value);
        }
    });

    const url = `${API_URL}/api/sales?${queryString.toString()}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching sales:', error);
        throw error;
    }
}
