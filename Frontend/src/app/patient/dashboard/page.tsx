'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { Activity, ArrowUpRight, Calendar, ChevronRight, Clock, MessageSquare, MoreHorizontal, Paperclip, Plus, Send, Shield, Smile, User } from 'lucide-react';
import Button from '@/components/Button';

export default function PatientDashboard() {
    const { user } = useAuth();

    const stats = [
        { label: 'Upcoming', value: '2', icon: <Calendar size={20} />, color: 'bg-blue-500' },
        { label: 'Consultations', value: '12', icon: <MessageSquare size={20} />, color: 'bg-purple-500' },
        { label: 'Health Score', value: '98', icon: <Activity size={20} />, color: 'bg-green-500' },
    ];

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="patient" />

            <main className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Hello, {user?.name || 'Patient'} 👋</h1>
                        <p className="text-gray-500 mt-1">Here's what's happening with your health today.</p>
                    </div>
                    <Button>
                        <Plus size={20} className="mr-2" /> Book Appointment
                    </Button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {stats.map((stat) => (
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

                {/* Recent Activity & Next Appointment */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Next Appointment */}
                    <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Next Appointment</h3>
                            <button className="text-primary text-sm font-bold hover:underline flex items-center">
                                View all <ArrowUpRight size={14} className="ml-1" />
                            </button>
                        </div>

                        <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-2xl flex flex-col items-center justify-center border border-primary/20">
                                <span className="text-primary font-bold text-lg">12</span>
                                <span className="text-primary/60 text-xs font-bold uppercase">Jan</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800">Dr. Sarah Johnson</h4>
                                <p className="text-gray-500 text-sm">Cardiologist • 10:30 AM</p>
                            </div>
                            <div className="text-primary">
                                <Clock size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Health Tips / Resources */}
                    <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Health Tips for You</h3>
                        <div className="space-y-4">
                            {[
                                { title: 'The Importance of Daily Hydration', tag: 'Wellness' },
                                { title: 'Understanding Heart Rate Variability', tag: 'Advanced' },
                                { title: 'Foods that boost your Immunity', tag: 'Nutrition' }
                            ].map((tip, i) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-1 inline-block">
                                            {tip.tag}
                                        </span>
                                        <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{tip.title}</h4>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
