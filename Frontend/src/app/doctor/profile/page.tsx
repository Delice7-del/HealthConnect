'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, MapPin, Camera, Shield, Award, Clock, Briefcase } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

export default function DoctorProfile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="doctor" />

            <main className="flex-1 p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Dr. {user?.name}'s Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your professional profile and availability.</p>
                </header>

                <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Professional Overview Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100 text-center">
                            <div className="relative inline-block mb-6">
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                                    {user?.name?.charAt(0) || 'D'}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center text-white" title="Verified Provider">
                                    <Shield size={12} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Dr. {user?.name}</h3>
                            <p className="text-primary font-bold text-sm mt-1">Cardiologist</p>
                            <div className="mt-6 pt-6 border-t border-gray-50 flex justify-around text-center">
                                <div>
                                    <p className="text-xl font-bold text-gray-800">4.9</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rating</p>
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-gray-800">1.2k</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reports</p>
                                </div>
                            </div>
                        </div>

                        <nav className="bg-white p-4 rounded-3xl premium-shadow border border-gray-100 space-y-2">
                            {[
                                { label: 'Public Profile', icon: <User size={18} />, active: true },
                                { label: 'Qualifications', icon: <Award size={18} /> },
                                { label: 'Office Details', icon: <Briefcase size={18} /> },
                                { label: 'Security', icon: <Shield size={18} /> },
                            ].map((item) => (
                                <button
                                    key={item.label}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all",
                                        item.active ? "bg-primary text-white shadow-md shadow-primary/20" : "text-gray-500 hover:bg-gray-50"
                                    )}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Form Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-xl font-bold text-gray-800">Professional Information</h3>
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                                    {isEditing ? 'Cancel' : 'Edit Info'}
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-500 mb-2">Practice Hospital</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                                            disabled={!isEditing}
                                            defaultValue="St. Mary's Medical Center"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-500 mb-2">Years of Experience</label>
                                    <div className="relative">
                                        <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="number"
                                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                                            disabled={!isEditing}
                                            defaultValue="12"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-500 mb-2">Professional Bio</label>
                                    <textarea
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]"
                                        disabled={!isEditing}
                                        defaultValue="Specialized in cardiovascular intensive care with over 12 years of experience in managing complex heart conditions and preventive cardiology."
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="mt-10 pt-8 border-t border-gray-50 flex justify-end">
                                    <Button onClick={() => setIsEditing(false)}>Save Profile</Button>
                                </div>
                            )}
                        </div>

                        <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Clock size={20} className="text-primary" /> Availability Settings
                            </h3>
                            <div className="space-y-4">
                                {['Monday', 'Wednesday', 'Friday'].map((day) => (
                                    <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-gray-400 text-xs shadow-sm">
                                                {day.substring(0, 3)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{day}</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase">09:00 AM - 05:00 PM</p>
                                            </div>
                                        </div>
                                        <button className="text-primary text-xs font-bold hover:underline">Change</button>
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
