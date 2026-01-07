'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Settings, Shield, Bell, Globe, Database, HelpCircle, Save } from 'lucide-react';
import Button from '@/components/Button';

export default function AdminSettings() {
    const sections = [
        { title: 'General Configuration', icon: <Settings size={18} />, desc: 'Modify basic platform branding and behavior.' },
        { title: 'Security & Access', icon: <Shield size={18} />, desc: 'Configure role permissions and authentication rules.' },
        { title: 'Communication Channels', icon: <Bell size={18} />, desc: 'Manage automated email and notification templates.' },
        { title: 'Global Localization', icon: <Globe size={18} />, desc: 'Update system languages and timezone settings.' },
    ];

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="admin" />

            <main className="flex-1 p-8">
                <header className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
                        <p className="text-gray-500 mt-1">Platform-wide configurations and maintenance tools.</p>
                    </div>
                    <Button>
                        <Save size={18} className="mr-2" /> Save All Changes
                    </Button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((section, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100 hover:border-primary/20 transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary group-hover:text-white">
                                {section.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                            <p className="text-gray-500 text-sm mb-8">{section.desc}</p>

                            <div className="space-y-4 pt-6 border-t border-gray-50">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Status</span>
                                    <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">Optimized</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Last Updated</span>
                                    <span className="text-xs font-bold text-gray-600">2 days ago</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Maintenance Utility */}
                    <div className="md:col-span-2 bg-gray-900 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <Database size={160} />
                        </div>
                        <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                            <h3 className="text-2xl font-bold mb-2">System Maintenance</h3>
                            <p className="text-gray-400 text-sm max-w-md italic">
                                Perform database backups, clear system logs, or run platform-wide integrity checks. This action requires super-admin privileges.
                            </p>
                        </div>
                        <div className="flex gap-4 relative z-10">
                            <Button className="bg-white/10 hover:bg-white/20 border-white/20 text-white shadow-none">
                                Run Health Check
                            </Button>
                            <Button className="bg-white text-gray-900 hover:bg-white/90">
                                Backup Data
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
