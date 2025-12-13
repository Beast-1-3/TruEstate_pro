'use client';

import React from 'react';

interface PaginationControlsProps {
    nextCursor: string | null;
    prevCursor: string | null;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    onNext: () => void;
    onPrev: () => void;
    onPageClick: (page: number) => void;
    isLoading?: boolean;
}

export default function PaginationControls({
    hasNextPage,
    hasPrevPage,
    totalItems,
    totalPages,
    currentPage,
    itemsPerPage,
    onNext,
    onPrev,
    onPageClick,
    isLoading = false,
}: PaginationControlsProps) {
    // Calculate showing range
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Generate page numbers to show (current page near center, left-heavy)
    // Shows: 2 pages before current, current, 3 pages after
    const getPageNumbers = () => {
        const pages: number[] = [];
        const maxPages = typeof window !== 'undefined' && window.innerWidth < 640 ? 5 : 7;

        // Calculate start (2 pages before current, or 1 if near beginning)
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(start + maxPages - 1, totalPages);

        // Adjust start if we're near the end
        if (end - start < maxPages - 1) {
            start = Math.max(1, end - maxPages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-white border-t border-gray-200 rounded-b-lg">
            {/* Results info */}
            <div className="text-sm text-gray-700 text-center sm:text-left">
                <span className="hidden sm:inline">Showing </span>
                <span className="font-medium">{startItem}-{endItem}</span>
                <span className="hidden sm:inline"> of </span>
                <span className="sm:hidden"> / </span>
                <span className="font-medium">{totalItems.toLocaleString()}</span>
            </div>

            {/* Page numbers and navigation */}
            <div className="flex items-center gap-1">
                {/* Previous button */}
                <button
                    onClick={onPrev}
                    disabled={!hasPrevPage || currentPage <= 1 || isLoading}
                    className={`
            p-2 text-sm font-medium rounded-md transition-colors duration-200
            ${hasPrevPage && currentPage > 1 && !isLoading
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-300 cursor-not-allowed'
                        }
          `}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Page number buttons */}
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => page !== currentPage && onPageClick(page)}
                        disabled={isLoading || page === currentPage}
                        className={`
              min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 px-2 sm:px-3 text-sm font-medium rounded-md transition-colors duration-200
              ${page === currentPage
                                ? 'bg-gray-800 text-white cursor-default'
                                : isLoading
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
                            }
            `}
                    >
                        {page}
                    </button>
                ))}

                {/* Show ellipsis if there are more pages */}
                {currentPage + 5 < totalPages && (
                    <span className="px-1 sm:px-2 text-gray-400">...</span>
                )}

                {/* Next button */}
                <button
                    onClick={onNext}
                    disabled={!hasNextPage || isLoading}
                    className={`
            p-2 text-sm font-medium rounded-md transition-colors duration-200
            ${hasNextPage && !isLoading
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-gray-300 cursor-not-allowed'
                        }
          `}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
