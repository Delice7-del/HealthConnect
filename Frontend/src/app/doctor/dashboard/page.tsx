'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { Users, Calendar, MessageSquare, Star, ArrowUpRight, Check, X, Clock, ChevronRight } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

export default function DoctorDashboard() {
    const { user } = useAuth();

    const doctorStats = [
        { label: 'Total Patients', value: '1,284', icon: <Users size={20} />, color: 'bg-blue-500' },
        { label: 'Today Appointments', value: '8', icon: <Calendar size={20} />, color: 'bg-purple-500' },
        { label: 'Average Rating', value: '4.9', icon: <Star size={20} />, color: 'bg-yellow-500' },
    ];

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="doctor" />

            <main className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome, Dr. {user?.name || 'Provider'}</h1>
                        <p className="text-gray-500 mt-1">You have 3 pending appointments to review today.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline">Update Availability</Button>
                        <Button>View Patient Records</Button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {doctorStats.map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-3xl premium-shadow border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                            </div>
                            <div className={`${stat.color} text-white p-3 rounded-2xl`}>
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Appointments */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-gray-800">Pending Appointments</h3>
                                <button className="text-primary text-sm font-bold hover:underline">View all</button>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { name: 'Michael Chen', reason: 'Annual Checkup', time: '11:00 AM', status: 'pending' },
                                    { name: 'Emma Wilson', reason: 'Cardiac Consult', time: '02:30 PM', status: 'pending' },
                                    { name: 'David Lee', reason: 'Follow-up', time: '04:15 PM', status: 'pending' }
                                ].map((app, i) => (
                                    <div key={i} className="flex items-center gap-6 p-4 border border-gray-50 rounded-2xl hover:bg-gray-50 transition-all">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-400">
                                            {app.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800">{app.name}</h4>
                                            <p className="text-xs text-gray-500">{app.reason} • {app.time}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                                                <Check size={18} />
                                            </button>
                                            <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Schedule Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 font-primary">Today's Schedule</h3>
                            <div className="space-y-6">
                                {[
                                    { time: '09:00', patient: 'Available', type: 'slot' },
                                    { time: '10:30', patient: 'Sophie Adams', type: 'booked' },
                                    { time: '11:00', patient: 'Michael Chen', type: 'pending' }
                                ].map((slot, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="text-xs font-bold text-gray-400 w-10 pt-1">{slot.time}</span>
                                        <div className={cn(
                                            "flex-1 p-3 rounded-xl border-l-4",
                                            slot.type === 'booked' ? "bg-primary/5 border-primary" :
                                                slot.type === 'pending' ? "bg-yellow-50 border-yellow-400" :
                                                    "bg-gray-50 border-gray-200 border-dashed border-l-0"
                                        )}>
                                            <p className={cn(
                                                "text-xs font-bold",
                                                slot.type === 'booked' ? "text-primary" :
                                                    slot.type === 'pending' ? "text-yellow-700" : "text-gray-400"
                                            )}>{slot.patient}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
