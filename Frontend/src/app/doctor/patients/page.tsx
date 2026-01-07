'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Search, User, Phone, Mail, Calendar, MoreVertical, Shield } from 'lucide-react';
import Button from '@/components/Button';

export default function DoctorPatients() {
    const [searchTerm, setSearchTerm] = useState('');

    const patients = [
        { id: '1', name: 'Michael Chen', email: 'michael@example.com', phone: '+1 234 567 890', lastVisit: '2023-12-15' },
        { id: '2', name: 'Emma Wilson', email: 'emma@example.com', phone: '+1 234 567 891', lastVisit: '2023-11-20' },
        { id: '3', name: 'David Lee', email: 'david@example.com', phone: '+1 234 567 892', lastVisit: '2023-12-28' },
    ];

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="doctor" />

            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Patient Directory</h1>
                        <p className="text-gray-500 mt-1">Access and manage your patient's medical records.</p>
                    </div>
                    <div className="relative w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {patients.map((patient) => (
                        <div key={patient.id} className="bg-white p-6 rounded-3xl premium-shadow border border-gray-100 hover:border-primary/20 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-xl font-bold">
                                    {patient.name.charAt(0)}
                                </div>
                                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-1">{patient.name}</h3>
                            <p className="text-gray-500 text-sm mb-6">Patient ID: #HC-{patient.id.padStart(4, '0')}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail size={14} className="text-gray-400" /> {patient.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Phone size={14} className="text-gray-400" /> {patient.phone}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Calendar size={14} className="text-gray-400" /> Last Visit: {patient.lastVisit}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    <Shield size={10} /> Insured
                                </span>
                                <button className="text-primary text-sm font-bold hover:underline">View History</button>
                            </div>
                        </div>
                    ))}

                    <button className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-primary/50 hover:text-primary transition-all group">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 mb-4 group-hover:bg-primary/10">
                            <User size={24} />
                        </div>
                        <p className="font-bold">Register New Patient</p>
                    </button>
                </div>
            </main>
        </div>
    );
}
