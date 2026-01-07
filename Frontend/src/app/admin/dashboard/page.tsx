'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { Users, Activity, ShieldCheck, FileText, TrendingUp, AlertCircle, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
    const { user } = useAuth();

    const adminStats = [
        { label: 'Total Users', value: '12.4k', icon: <Users size={20} />, color: 'bg-blue-500', trend: '+12%' },
        { label: 'Active Doctors', value: '842', icon: <Activity size={20} />, color: 'bg-green-500', trend: '+5%' },
        { label: 'Pending Approvals', value: '24', icon: <ShieldCheck size={20} />, color: 'bg-yellow-500', trend: '-2' },
    ];

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="admin" />

            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Control Center</h1>
                    <p className="text-gray-500 mt-1">Platform overview and management dashboard.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {adminStats.map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-3xl premium-shadow border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`${stat.color} text-white p-3 rounded-2xl shadow-lg shadow-opacity-20`}>
                                    {stat.icon}
                                </div>
                                <span className={cn(
                                    "text-xs font-bold px-2 py-1 rounded-full",
                                    stat.trend.startsWith('+') ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                                )}>
                                    {stat.trend}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Platform Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* User Signups Chart Placeholder */}
                    <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100 h-80 flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <TrendingUp size={20} className="text-primary" /> User Growth
                            </h3>
                            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold outline-none">
                                <option>Last 30 Days</option>
                                <option>Last 6 Months</option>
                            </select>
                        </div>
                        <div className="flex-1 flex items-end justify-between gap-2 px-2">
                            {[40, 60, 45, 70, 85, 55, 90].map((h, i) => (
                                <div key={i} className="bg-primary/20 hover:bg-primary w-full rounded-t-lg transition-all cursor-pointer group relative" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                        {h}k
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Alerts */}
                    <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <AlertCircle size={20} className="text-yellow-500" /> Platform Notifications
                        </h3>
                        <div className="space-y-4">
                            {[
                                { type: 'Doctor Approval', msg: 'New application from Dr. Alan Rickman', time: '2m ago' },
                                { type: 'Security', msg: 'Multiple failed login attempts detected', time: '15m ago' },
                                { type: 'Report', msg: 'Monthly performance report is ready', time: '1h ago' }
                            ].map((alert, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer">
                                    <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Activity size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-primary uppercase">{alert.type}</p>
                                        <p className="text-sm text-gray-800 font-medium">{alert.msg}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold">{alert.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
