'use client';

import { useState } from 'react';

interface SortDropdownProps {
    sortBy: string;
    sortOrder: string;
    onSortChange: (sortBy: string, sortOrder: string) => void;
}

const SORT_OPTIONS = [
    { value: 'date', label: 'Date' },
    { value: 'customerName', label: 'Customer Name (A-Z)' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'finalAmount', label: 'Final Amount' },
];

export default function SortDropdown({ sortBy, sortOrder, onSortChange }: SortDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const currentOption = SORT_OPTIONS.find((opt) => opt.value === sortBy);
    const displayLabel = currentOption
        ? `Sort by: ${currentOption.label}${sortOrder === 'asc' ? ' ↑' : ' ↓'}`
        : 'Sort by';

    const handleSelect = (value: string) => {
        // Toggle order if same field selected, otherwise use desc
        const newOrder = value === sortBy && sortOrder === 'desc' ? 'asc' : 'desc';
        onSortChange(value, newOrder);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
                {displayLabel}
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 z-20 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                        {SORT_OPTIONS.map((option) => (
                            <div
                                key={option.value}
                                className={`dropdown-item flex items-center justify-between ${sortBy === option.value ? 'bg-primary-50 text-primary-700' : ''
                                    }`}
                                onClick={() => handleSelect(option.value)}
                            >
                                <span>{option.label}</span>
                                {sortBy === option.value && (
                                    <span className="text-primary-600">
                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
