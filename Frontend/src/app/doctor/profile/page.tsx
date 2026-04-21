'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, MapPin, Camera, Shield, Award, Clock, Briefcase, Lock } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import { apiCall } from '@/lib/api';
import toast from 'react-hot-toast';

export default function DoctorProfile() {
    const { user, checkAuth } = useAuth();
    const [activeTab, setActiveTab] = useState('Public Profile');
    const [isSaving, setIsSaving] = useState(false);

    // Profile State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        bio: '',
        specialization: '',
        hospital: '',
        experience: 0,
        consultationFee: 0,
    });

    // Security State
    const [securityData, setSecurityData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                bio: user.doctorDetails?.bio || '',
                specialization: user.doctorDetails?.specialization || '',
                hospital: user.doctorDetails?.hospital || '',
                experience: user.doctorDetails?.experience || 0,
                consultationFee: user.doctorDetails?.consultationFee || 0,
            });
        }
    }, [user]);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await apiCall('/users/profile', {
                method: 'PUT',
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    doctorDetails: {
                        bio: formData.bio,
                        specialization: formData.specialization,
                        hospital: formData.hospital,
                        experience: Number(formData.experience),
                        consultationFee: Number(formData.consultationFee)
                    }
                })
            });
            await checkAuth(); // Refresh user context
            toast.success('Profile updated successfully!');
        } catch (err: any) {
            toast.error(err.message || 'Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSecuritySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (securityData.newPassword !== securityData.confirmPassword) {
            return toast.error('New passwords do not match!');
        }
        setIsSaving(true);
        try {
            await apiCall('/users/settings/change-password', {
                method: 'PUT',
                body: JSON.stringify({
                    currentPassword: securityData.currentPassword,
                    newPassword: securityData.newPassword
                })
            });
            toast.success('Password changed successfully!');
            setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err: any) {
            toast.error(err.message || 'Failed to change password');
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { label: 'Public Profile', icon: <User size={18} /> },
        { label: 'Qualifications', icon: <Award size={18} /> },
        { label: 'Office Details', icon: <Briefcase size={18} /> },
        { label: 'Security', icon: <Shield size={18} /> },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Public Profile':
                return (
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-500 mb-2">Specialization</label>
                                <input
                                    type="text"
                                    value={formData.specialization}
                                    onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="e.g. Cardiologist"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-500 mb-2">Professional Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                    className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]"
                                    placeholder="Tell patients about yourself..."
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4 border-t border-gray-50 mt-6">
                            <Button type="submit" isLoading={isSaving}>Save Public Profile</Button>
                        </div>
                    </form>
                );
            case 'Qualifications':
                return (
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-2">Years of Experience</label>
                                <input
                                    type="number"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({...formData, experience: Number(e.target.value)})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4 border-t border-gray-50 mt-6">
                            <Button type="submit" isLoading={isSaving}>Save Qualifications</Button>
                        </div>
                    </form>
                );
            case 'Office Details':
                return (
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-2">Practice Hospital</label>
                                <input
                                    type="text"
                                    value={formData.hospital}
                                    onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="e.g. St. Mary's Medical Center"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-2">Consultation Fee ($)</label>
                                <input
                                    type="number"
                                    value={formData.consultationFee}
                                    onChange={(e) => setFormData({...formData, consultationFee: Number(e.target.value)})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4 border-t border-gray-50 mt-6">
                            <Button type="submit" isLoading={isSaving}>Save Office Details</Button>
                        </div>
                    </form>
                );
            case 'Security':
                return (
                    <form onSubmit={handleSecuritySubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 max-w-lg">
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-2">Current Password</label>
                                <input
                                    type="password"
                                    required
                                    value={securityData.currentPassword}
                                    onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-2">New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={securityData.newPassword}
                                    onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-500 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={securityData.confirmPassword}
                                    onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>
                        <div className="flex justify-start pt-4 border-t border-gray-50 mt-6">
                            <Button type="submit" isLoading={isSaving}>Change Password</Button>
                        </div>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="doctor" />

            <main className="flex-1 p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Dr. {user?.name}'s Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your professional profile and availability.</p>
                </header>

                <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Overview Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-3xl premium-shadow border border-gray-100 text-center">
                            <div className="relative inline-block mb-4">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold mx-auto">
                                    {user?.name?.charAt(0) || 'D'}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center text-white" title="Verified Provider">
                                    <Shield size={12} />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">Dr. {user?.name}</h3>
                            <p className="text-primary font-bold text-xs mt-1">{formData.specialization || 'Provider'}</p>
                        </div>

                        <nav className="bg-white p-3 rounded-3xl premium-shadow border border-gray-100 space-y-1">
                            {tabs.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => setActiveTab(item.label)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all text-sm",
                                        activeTab === item.label 
                                            ? "bg-primary text-white shadow-md shadow-primary/20" 
                                            : "text-gray-500 hover:bg-gray-50"
                                    )}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Form Content Area */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100 min-h-[500px]">
                            <h3 className="text-xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-50">
                                {activeTab}
                            </h3>
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
