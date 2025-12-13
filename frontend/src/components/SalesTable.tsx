'use client';

import { SalesItem } from '@/services/salesApi';

interface SalesTableProps {
    data: SalesItem[];
}

export default function SalesTable({ data }: SalesTableProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="table-header">Transaction ID</th>
                            <th className="table-header">Date</th>
                            <th className="table-header">Customer ID</th>
                            <th className="table-header">Customer Name</th>
                            <th className="table-header">Phone Number</th>
                            <th className="table-header">Gender</th>
                            <th className="table-header">Age</th>
                            <th className="table-header">Product Category</th>
                            <th className="table-header">Quantity</th>
                            <th className="table-header">Total Amount</th>
                            <th className="table-header">Customer Region</th>
                            <th className="table-header">Product ID</th>
                            <th className="table-header">Employee Name</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item) => (
                            <tr key={item.transactionId} className="hover:bg-gray-50 transition-colors">
                                <td className="table-cell font-medium">{item.transactionId}</td>
                                <td className="table-cell">{formatDate(item.date)}</td>
                                <td className="table-cell">{item.customerId}</td>
                                <td className="table-cell">{item.customerName}</td>
                                <td className="table-cell">
                                    <div className="flex items-center gap-1">
                                        <span>{item.phoneNumber}</span>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(item.phoneNumber)}
                                            className="text-gray-400 hover:text-gray-600"
                                            title="Copy phone number"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="table-cell">{item.gender}</td>
                                <td className="table-cell">{item.age}</td>
                                <td className="table-cell">
                                    <span className="text-primary-600">{item.productCategory}</span>
                                </td>
                                <td className="table-cell">{String(item.quantity).padStart(2, '0')}</td>
                                <td className="table-cell font-medium">{formatCurrency(item.finalAmount)}</td>
                                <td className="table-cell">{item.customerRegion}</td>
                                <td className="table-cell">{item.productId}</td>
                                <td className="table-cell">{item.employeeName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
