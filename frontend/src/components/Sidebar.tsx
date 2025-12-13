'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SidebarProps {
    onClose?: () => void;
    collapsed?: boolean;
    onToggleCollapse?: () => void;
}

const NAV_ITEMS = [
    { name: 'Dashboard', href: '/', icon: 'dashboard' },
    { name: 'Nexus', href: '/nexus', icon: 'nexus' },
    { name: 'Intake', href: '/intake', icon: 'intake' },
];

const SERVICE_ITEMS = [
    { name: 'Pre-active', href: '/services/pre-active', icon: 'circle' },
    { name: 'Active', href: '/services/active', icon: 'active' },
    { name: 'Blocked', href: '/services/blocked', icon: 'blocked' },
    { name: 'Closed', href: '/services/closed', icon: 'closed' },
];

const INVOICE_ITEMS = [
    { name: 'Proforma Invoices', href: '/invoices/proforma', icon: 'invoice' },
    { name: 'Final Invoices', href: '/invoices/final', icon: 'invoice' },
];

interface IconProps {
    name: string;
    className?: string;
}

function Icon({ name, className = 'w-5 h-5' }: IconProps) {
    switch (name) {
        case 'dashboard':
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            );
        case 'nexus':
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
            );
        case 'intake':
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        case 'circle':
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" strokeWidth={2} />
                </svg>
            );
        case 'active':
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case 'blocked':
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
            );
        case 'closed':
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        case 'invoice':
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
            );
        default:
            return null;
    }
}

export default function Sidebar({ onClose, collapsed = false, onToggleCollapse }: SidebarProps) {
    const [isServicesExpanded, setIsServicesExpanded] = useState(true);
    const [isInvoicesExpanded, setIsInvoicesExpanded] = useState(true);

    return (
        <aside className={`h-screen bg-sidebar-bg text-sidebar-text flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
            {/* Header with toggle/close buttons */}
            <div className="p-3 border-b border-gray-700 flex items-center justify-between">
                <div className={`flex items-center gap-3 ${collapsed ? 'justify-center w-full' : ''}`}>
                    <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">TE</span>
                    </div>
                    {!collapsed && (
                        <div>
                            <div className="font-semibold text-white">TruEstate</div>
                            <div className="text-xs text-gray-400">Akarsh Singh</div>
                        </div>
                    )}
                </div>
                {/* Buttons container */}
                <div className="flex items-center gap-1">
                    {/* Collapse toggle button (desktop only) */}
                    {onToggleCollapse && !collapsed && (
                        <button
                            onClick={onToggleCollapse}
                            className="hidden lg:flex p-1.5 rounded hover:bg-sidebar-hover text-gray-400 hover:text-white transition-colors"
                            title="Collapse sidebar"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    {/* Close button on mobile */}
                    {onClose && !collapsed && (
                        <button
                            onClick={onClose}
                            className="lg:hidden p-1.5 rounded hover:bg-sidebar-hover text-gray-400 hover:text-white transition-colors"
                            title="Close sidebar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Expand button when collapsed */}
            {collapsed && onToggleCollapse && (
                <button
                    onClick={onToggleCollapse}
                    className="hidden lg:flex mx-auto mt-2 p-2 rounded hover:bg-sidebar-hover text-gray-400 hover:text-white transition-colors"
                    title="Expand sidebar"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                </button>
            )}

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-3">
                {/* Main Nav */}
                <ul className="space-y-1 px-2">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.name}>
                            <div
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-default ${collapsed ? 'justify-center' : ''} ${item.name === 'Dashboard'
                                    ? 'bg-sidebar-active text-white'
                                    : 'text-gray-300 hover:bg-sidebar-hover hover:text-white'
                                    }`}
                            >
                                <Icon name={item.icon} />
                                {!collapsed && <span>{item.name}</span>}
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Services Section - Card Style */}
                <div className={`mt-4 mx-2 ${collapsed ? '' : 'bg-white/5 rounded-xl p-2'}`}>
                    {!collapsed && (
                        <div
                            className="flex items-center justify-between px-2 mb-2 cursor-pointer hover:text-white transition-colors"
                            onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                        >
                            <div className="flex items-center gap-2 text-gray-400">
                                <Icon name="intake" className="w-5 h-5" />
                                <span className="text-sm font-medium">Services</span>
                            </div>
                            <svg
                                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isServicesExpanded ? 'transform rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    )}
                    {(isServicesExpanded || collapsed) && (
                        <ul className="space-y-1">
                            {SERVICE_ITEMS.map((item) => (
                                <li key={item.name}>
                                    <div
                                        title={collapsed ? item.name : undefined}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-default ${collapsed ? 'justify-center' : ''}`}
                                    >
                                        <Icon name={item.icon} className="w-4 h-4" />
                                        {!collapsed && <span className="text-sm">{item.name}</span>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Invoices Section - Card Style */}
                <div className={`mt-3 mx-2 ${collapsed ? '' : 'bg-white/5 rounded-xl p-2'}`}>
                    {!collapsed && (
                        <div
                            className="flex items-center justify-between px-2 mb-2 cursor-pointer hover:text-white transition-colors"
                            onClick={() => setIsInvoicesExpanded(!isInvoicesExpanded)}
                        >
                            <div className="flex items-center gap-2 text-gray-400">
                                <Icon name="invoice" className="w-5 h-5" />
                                <span className="text-sm font-medium">Invoices</span>
                            </div>
                            <svg
                                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isInvoicesExpanded ? 'transform rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    )}
                    {(isInvoicesExpanded || collapsed) && (
                        <ul className="space-y-1">
                            {INVOICE_ITEMS.map((item) => (
                                <li key={item.name}>
                                    <div
                                        title={collapsed ? item.name : undefined}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-default ${collapsed ? 'justify-center' : ''}`}
                                    >
                                        <Icon name={item.icon} className="w-4 h-4" />
                                        {!collapsed && <span className="text-sm">{item.name}</span>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </nav>
        </aside>
    );
}
