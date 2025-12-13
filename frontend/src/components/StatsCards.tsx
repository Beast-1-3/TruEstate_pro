'use client';

import { SalesStats } from '@/services/salesApi';

interface StatsCardsProps {
    stats: SalesStats;
    loading?: boolean;
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const cards = [
        {
            title: 'Total units sold',
            value: stats.totalUnitsSold.toString(),
            subtitle: `${stats.transactionCount} SRs`,
            icon: (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
        },
        {
            title: 'Total Amount',
            value: formatCurrency(stats.totalAmount),
            subtitle: `(${stats.transactionCount} SRs)`,
            icon: (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            highlight: true,
        },
        {
            title: 'Total Discount',
            value: formatCurrency(stats.totalDiscount),
            subtitle: `(${stats.transactionCount} SRs)`,
            icon: (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
            ),
            color: 'text-red-600',
        },
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="card p-4 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                        <div className="h-6 bg-gray-200 rounded w-32" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {cards.map((card, index) => (
                <div key={index} className="card p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-500">{card.title}</span>
                        {card.icon}
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-xl font-semibold ${card.color || 'text-gray-900'}`}>
                            {card.value}
                        </span>
                        {card.subtitle && (
                            <span className="text-sm text-gray-400">{card.subtitle}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
