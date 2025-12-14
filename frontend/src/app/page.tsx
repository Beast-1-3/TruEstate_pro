'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import SortDropdown from '@/components/SortDropdown';
import SalesTable from '@/components/SalesTable';
import PaginationControls from '@/components/PaginationControls';
import StatsCards from '@/components/StatsCards';
import EmptyState from '@/components/EmptyState';
import { useSalesData } from '@/hooks/useSalesData';

function SalesPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Get filter values from URL
    const search = searchParams.get('search') || '';
    const region = searchParams.get('region') || '';
    const gender = searchParams.get('gender') || '';
    const category = searchParams.get('category') || '';
    const paymentMethod = searchParams.get('paymentMethod') || '';
    const ageMin = searchParams.get('ageMin') || '';
    const ageMax = searchParams.get('ageMax') || '';
    const dateFrom = searchParams.get('dateFrom') || '';
    const dateTo = searchParams.get('dateTo') || '';
    const tags = searchParams.get('tags') || '';
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Local state for search input
    const [searchInput, setSearchInput] = useState(search);

    // Build filters object for FilterPanel
    const filters = {
        region,
        gender,
        ageMin,
        ageMax,
        category,
        tags,
        paymentMethod,
        dateFrom,
        dateTo,
    };

    // Fetch data with cursor-based pagination
    const {
        data,
        pagination,
        stats,
        loading,
        error,
        goToNext,
        goToPrev,
        goToPage,
    } = useSalesData({
        search,
        region,
        gender,
        category,
        paymentMethod,
        ageMin,
        ageMax,
        dateFrom,
        dateTo,
        tags,
        sortBy,
        sortOrder,
        limit: '10',
    });

    // Update URL params and reset pagination
    const updateParams = useCallback((updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        router.push(`?${params.toString()}`);
    }, [router, searchParams]);

    // Handle search
    const handleSearch = useCallback(() => {
        updateParams({ search: searchInput });
    }, [searchInput, updateParams]);

    // Handle filter changes
    const handleFilterChange = useCallback((filterUpdates: Record<string, string>) => {
        updateParams(filterUpdates);
    }, [updateParams]);

    // Handle sort changes
    const handleSortChange = useCallback((newSortBy: string, newSortOrder: string) => {
        updateParams({ sortBy: newSortBy, sortOrder: newSortOrder });
    }, [updateParams]);

    // Clear all filters
    const handleClearFilters = useCallback(() => {
        setSearchInput('');
        router.push('/');
    }, [router]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - hidden on mobile, visible on desktop */}
            <div className={`
                fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out
                lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar
                    onClose={() => setSidebarOpen(false)}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
            </div>

            {/* Main Content */}
            <main className={`flex-1 px-4 py-3 min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Sales Management System</h1>
                    </div>
                    <SearchBar
                        value={searchInput}
                        onChange={setSearchInput}
                        onSearch={handleSearch}
                        onClear={() => updateParams({ search: '' })}
                        placeholder="Name, Phone no."
                    />
                </div>

                {/* Filters and Sort */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
                    <FilterPanel
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                    />
                    <div className="flex-shrink-0">
                        <SortDropdown
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortChange={handleSortChange}
                        />
                    </div>
                </div>

                {/* Stats Cards - calculated from current page data */}
                <StatsCards
                    stats={{
                        totalUnitsSold: data.reduce((sum, item) => sum + item.quantity, 0),
                        totalAmount: data.reduce((sum, item) => sum + item.finalAmount, 0),
                        totalDiscount: data.reduce((sum, item) => sum + (item.totalAmount - item.finalAmount), 0),
                        transactionCount: data.length,
                    }}
                    loading={loading}
                />

                {/* Data Table or Empty State */}
                {error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                        Error loading data: {error}
                    </div>
                ) : loading ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
                        Loading sales data...
                    </div>
                ) : data.length === 0 ? (
                    <EmptyState onClearFilters={handleClearFilters} />
                ) : (
                    <>
                        <SalesTable data={data} />
                        <PaginationControls
                            nextCursor={pagination.nextCursor}
                            prevCursor={pagination.prevCursor}
                            hasNextPage={pagination.hasNextPage}
                            hasPrevPage={pagination.hasPrevPage}
                            totalItems={pagination.totalItems}
                            totalPages={pagination.totalPages}
                            currentPage={pagination.currentPage}
                            itemsPerPage={pagination.itemsPerPage}
                            onNext={goToNext}
                            onPrev={goToPrev}
                            onPageClick={goToPage}
                            isLoading={loading}
                        />
                    </>
                )}
            </main>
        </div>
    );
}

export default function SalesPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <SalesPageContent />
        </Suspense>
    );
}
