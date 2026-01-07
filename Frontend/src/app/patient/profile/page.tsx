'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, MapPin, Camera, Shield, Bell, Lock } from 'lucide-react';
import Button from '@/components/Button';

export default function PatientProfile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="patient" />

            <main className="flex-1 p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your personal information and preferences.</p>
                </header>

                <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100 text-center">
                            <div className="relative inline-block mb-6">
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                                    {user?.name?.charAt(0) || 'P'}
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-100 text-primary hover:scale-110 transition-transform">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
                            <p className="text-gray-500 text-sm">Patient ID: #HC-{(user?.id || '9827').slice(-4)}</p>
                        </div>

                        <nav className="bg-white p-4 rounded-3xl premium-shadow border border-gray-100 space-y-2">
                            {[
                                { label: 'Personal Info', icon: <User size={18} />, active: true },
                                { label: 'Notifications', icon: <Bell size={18} /> },
                                { label: 'Security', icon: <Lock size={18} /> },
                                { label: 'Privacy', icon: <Shield size={18} /> },
                            ].map((item) => (
                                <button
                                    key={item.label}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all ${item.active ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Profile Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-500 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-gray-800"
                                            disabled={!isEditing}
                                            defaultValue={user?.name}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-500 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-gray-800"
                                            disabled={!isEditing}
                                            defaultValue={user?.email}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-500 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="tel"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-gray-800"
                                            disabled={!isEditing}
                                            defaultValue={user?.phone || '+1 (555) 000-0000'}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-500 mb-2">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-gray-800"
                                            disabled={!isEditing}
                                            placeholder="New York, USA"
                                        />
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="mt-10 pt-8 border-t border-gray-50 flex justify-end">
                                    <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                                </div>
                            )}
                        </div>

                        <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 font-primary">Health Preferences</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div>
                                        <h4 className="font-bold text-gray-800">Email Notifications</h4>
                                        <p className="text-xs text-gray-500">Receive appointment reminders via email</p>
                                    </div>
                                    <div className="w-12 h-6 bg-primary rounded-full relative">
                                        <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div>
                                        <h4 className="font-bold text-gray-800">Two-Factor Authentication</h4>
                                        <p className="text-xs text-gray-500">Secure your account with 2FA</p>
                                    </div>
                                    <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                                        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
