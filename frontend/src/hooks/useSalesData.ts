'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { fetchSales, SalesResponse, SalesQueryParams } from '@/services/salesApi';

interface UseSalesDataParams {
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
    limit?: string;
}

export function useSalesData(params: UseSalesDataParams) {
    const [data, setData] = useState<SalesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isNavigating, setIsNavigating] = useState(false);

    // Cache cursors for each page we've visited
    const cursorCache = useRef<Map<number, string | null>>(new Map());

    // Memoize params to prevent unnecessary fetches
    const memoizedParams = useMemo(() => JSON.stringify(params), [params]);

    const fetchData = useCallback(async (cursor: string | null = null, direction: 'next' | 'prev' = 'next', page: number = 1) => {
        setLoading(true);
        setError(null);

        try {
            const parsedParams = JSON.parse(memoizedParams);
            const queryParams: SalesQueryParams = {
                ...parsedParams,
                cursor: cursor || undefined,
                direction: cursor ? direction : undefined,
            };

            const result = await fetchSales(queryParams);
            setData(result);
            setCurrentPage(page);

            // Cache the cursor for this page
            cursorCache.current.set(page, cursor);
            // Cache the next cursor for page+1
            if (result.pagination.nextCursor) {
                cursorCache.current.set(page + 1, result.pagination.nextCursor);
            }

            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch sales data');
            return null;
        } finally {
            setLoading(false);
        }
    }, [memoizedParams]);

    // Initial fetch and refetch on filter/sort changes
    useEffect(() => {
        cursorCache.current.clear();
        cursorCache.current.set(1, null); // Page 1 has no cursor
        setCurrentPage(1);
        fetchData(null, 'next', 1);
    }, [memoizedParams, fetchData]);

    const goToNext = useCallback(() => {
        if (data?.pagination.nextCursor) {
            const nextPage = currentPage + 1;
            fetchData(data.pagination.nextCursor, 'next', nextPage);
        }
    }, [data?.pagination.nextCursor, fetchData, currentPage]);

    const goToPrev = useCallback(() => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            const cachedCursor = cursorCache.current.get(prevPage);
            if (prevPage === 1) {
                fetchData(null, 'next', 1);
            } else if (cachedCursor !== undefined) {
                fetchData(cachedCursor, 'next', prevPage);
            }
        }
    }, [fetchData, currentPage]);

    // Navigate to a specific page
    const goToPage = useCallback(async (targetPage: number) => {
        if (targetPage === currentPage || isNavigating || targetPage < 1) return;

        const cachedCursor = cursorCache.current.get(targetPage);

        if (targetPage === 1) {
            fetchData(null, 'next', 1);
        } else if (cachedCursor !== undefined) {
            fetchData(cachedCursor, 'next', targetPage);
        } else if (targetPage > currentPage && data?.pagination.nextCursor) {
            // Forward navigation from current position
            setIsNavigating(true);
            setLoading(true);

            try {
                let result = data;
                let page = currentPage;
                let cursor: string | null = data.pagination.nextCursor;

                while (page < targetPage && cursor) {
                    const parsedParams = JSON.parse(memoizedParams);
                    result = await fetchSales({
                        ...parsedParams,
                        cursor,
                        direction: 'next',
                    });
                    page++;
                    cursorCache.current.set(page, cursor);
                    cursor = result?.pagination.nextCursor || null;

                    if (result.pagination.nextCursor) {
                        cursorCache.current.set(page + 1, result.pagination.nextCursor);
                    }
                }

                if (result) {
                    setData(result);
                    setCurrentPage(page);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to navigate');
            } finally {
                setLoading(false);
                setIsNavigating(false);
            }
        }
    }, [currentPage, data, memoizedParams, isNavigating, fetchData]);

    const reset = useCallback(() => {
        cursorCache.current.clear();
        cursorCache.current.set(1, null);
        setCurrentPage(1);
        fetchData(null, 'next', 1);
    }, [fetchData]);

    return {
        data: data?.data || [],
        pagination: {
            nextCursor: data?.pagination.nextCursor || null,
            prevCursor: data?.pagination.prevCursor || null,
            hasNextPage: data?.pagination.hasNextPage || false,
            hasPrevPage: currentPage > 1,
            itemsPerPage: data?.pagination.itemsPerPage || 10,
            totalItems: data?.pagination.totalItems || 0,
            totalPages: data?.pagination.totalPages || 0,
            currentPage,
        },
        stats: data?.stats || {
            totalUnitsSold: 0,
            totalAmount: 0,
            totalDiscount: 0,
            transactionCount: 0,
        },
        loading: loading || isNavigating,
        error,
        goToNext,
        goToPrev,
        goToPage,
        reset,
    };
}
