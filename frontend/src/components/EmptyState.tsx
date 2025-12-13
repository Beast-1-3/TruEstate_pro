'use client';

interface EmptyStateProps {
    onClearFilters?: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
    return (
        <div className="card p-12 text-center">
            <div className="flex flex-col items-center gap-4">
                {/* Empty state icon */}
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                    </svg>
                </div>

                {/* Message */}
                <div>
                    <h3 className="text-lg font-medium text-gray-900">No results found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search terms</p>
                </div>

                {/* Clear filters button */}
                {onClearFilters && (
                    <button
                        onClick={onClearFilters}
                        className="mt-2 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                    >
                        Clear all filters
                    </button>
                )}
            </div>
        </div>
    );
}
