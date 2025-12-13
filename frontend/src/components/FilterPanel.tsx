'use client';

import { useState } from 'react';

interface FilterPanelProps {
    filters: {
        region: string;
        gender: string;
        ageMin: string;
        ageMax: string;
        category: string;
        tags: string;
        paymentMethod: string;
        dateFrom: string;
        dateTo: string;
    };
    onFilterChange: (filters: Record<string, string>) => void;
    onClearFilters?: () => void;
}

const FILTER_OPTIONS = {
    region: ['East', 'Central', 'North', 'South', 'West'],
    gender: ['Male', 'Female'],
    category: ['Beauty', 'Electronics', 'Clothing'],
    paymentMethod: ['UPI', 'Credit Card', 'Debit Card', 'Cash', 'Wallet', 'Net Banking'],
    ageRanges: [
        { label: '18-25', min: '18', max: '25' },
        { label: '26-35', min: '26', max: '35' },
        { label: '36-45', min: '36', max: '45' },
        { label: '46-55', min: '46', max: '55' },
        { label: '55+', min: '55', max: '100' },
    ],
};

interface FilterDropdownProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

function FilterDropdown({ label, value, options, onChange }: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
                {label}
                {value && <span className="text-primary-600">({value})</span>}
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
                    <div className="absolute left-0 z-20 mt-1 min-w-full w-max max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                        <div
                            className="px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                            onClick={() => {
                                onChange('');
                                setIsOpen(false);
                            }}
                        >
                            All
                        </div>
                        {options.map((option) => (
                            <div
                                key={option}
                                className={`px-3 py-2 text-sm cursor-pointer whitespace-nowrap hover:bg-gray-50 ${value === option ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}`}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

interface AgeRangeDropdownProps {
    ageMin: string;
    ageMax: string;
    onChange: (min: string, max: string) => void;
}

function AgeRangeDropdown({ ageMin, ageMax, onChange }: AgeRangeDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const currentLabel = ageMin || ageMax
        ? `${ageMin || '0'}-${ageMax || '100'}`
        : '';

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
                Age Range
                {currentLabel && <span className="text-primary-600">({currentLabel})</span>}
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
                    <div className="dropdown-menu z-20">
                        <div
                            className="dropdown-item font-medium text-gray-400"
                            onClick={() => {
                                onChange('', '');
                                setIsOpen(false);
                            }}
                        >
                            All Ages
                        </div>
                        {FILTER_OPTIONS.ageRanges.map((range) => (
                            <div
                                key={range.label}
                                className={`dropdown-item ${ageMin === range.min && ageMax === range.max
                                    ? 'bg-primary-50 text-primary-700'
                                    : ''
                                    }`}
                                onClick={() => {
                                    onChange(range.min, range.max);
                                    setIsOpen(false);
                                }}
                            >
                                {range.label}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

interface DateRangeDropdownProps {
    dateFrom: string;
    dateTo: string;
    onChange: (from: string, to: string) => void;
}

function DateRangeDropdown({ dateFrom, dateTo, onChange }: DateRangeDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localFrom, setLocalFrom] = useState(dateFrom);
    const [localTo, setLocalTo] = useState(dateTo);

    const handleApply = () => {
        onChange(localFrom, localTo);
        setIsOpen(false);
    };

    const handleClear = () => {
        setLocalFrom('');
        setLocalTo('');
        onChange('', '');
        setIsOpen(false);
    };

    const hasDateRange = dateFrom || dateTo;

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
                Date
                {hasDateRange && <span className="text-primary-600">•</span>}
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
                    <div className="absolute z-20 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
                                <input
                                    type="date"
                                    value={localFrom}
                                    onChange={(e) => setLocalFrom(e.target.value)}
                                    className="input-field text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                                <input
                                    type="date"
                                    value={localTo}
                                    onChange={(e) => setLocalTo(e.target.value)}
                                    className="input-field text-sm"
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="flex-1 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                                >
                                    Clear
                                </button>
                                <button
                                    type="button"
                                    onClick={handleApply}
                                    className="flex-1 px-3 py-1.5 text-sm text-white bg-primary-600 rounded hover:bg-primary-700"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
    // Check if any filter is active
    const hasActiveFilters = Object.values(filters).some(v => v !== '');

    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* Reset button */}
            {onClearFilters && (
                <button
                    onClick={onClearFilters}
                    disabled={!hasActiveFilters}
                    title="Clear all filters"
                    className={`
                        p-2 rounded-lg border transition-colors duration-200
                        ${hasActiveFilters
                            ? 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                            : 'border-gray-200 text-gray-300 cursor-not-allowed'
                        }
                    `}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                </button>
            )}
            <FilterDropdown
                label="Customer Region"
                value={filters.region}
                options={FILTER_OPTIONS.region}
                onChange={(value) => onFilterChange({ region: value })}
            />
            <FilterDropdown
                label="Gender"
                value={filters.gender}
                options={FILTER_OPTIONS.gender}
                onChange={(value) => onFilterChange({ gender: value })}
            />
            <AgeRangeDropdown
                ageMin={filters.ageMin}
                ageMax={filters.ageMax}
                onChange={(min, max) => onFilterChange({ ageMin: min, ageMax: max })}
            />
            <FilterDropdown
                label="Product Category"
                value={filters.category}
                options={FILTER_OPTIONS.category}
                onChange={(value) => onFilterChange({ category: value })}
            />
            <FilterDropdown
                label="Tags"
                value={filters.tags}
                options={['organic', 'skincare', 'wireless', 'gadgets', 'fashion', 'casual', 'smart', 'portable']}
                onChange={(value) => onFilterChange({ tags: value })}
            />
            <FilterDropdown
                label="Payment Method"
                value={filters.paymentMethod}
                options={FILTER_OPTIONS.paymentMethod}
                onChange={(value) => onFilterChange({ paymentMethod: value })}
            />
            <DateRangeDropdown
                dateFrom={filters.dateFrom}
                dateTo={filters.dateTo}
                onChange={(from, to) => onFilterChange({ dateFrom: from, dateTo: to })}
            />
        </div>
    );
}
