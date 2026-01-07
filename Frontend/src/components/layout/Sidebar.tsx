'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Calendar,
    MessageSquare,
    BookOpen,
    User,
    Settings,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
    role: 'patient' | 'doctor' | 'admin';
}

export default function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();
    const { logout } = useAuth();

    const patientLinks = [
        { name: 'Dashboard', href: '/patient/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'My Appointments', href: '/patient/appointments', icon: <Calendar size={20} /> },
        { name: 'Consultations', href: '/patient/chat', icon: <MessageSquare size={20} /> },
        { name: 'Health Blog', href: '/patient/blog', icon: <BookOpen size={20} /> },
        { name: 'My Profile', href: '/patient/profile', icon: <User size={20} /> },
    ];

    // Logic for other roles can be added here
    const doctorLinks = [
        { name: 'Dashboard', href: '/doctor/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Appointments', href: '/doctor/appointments', icon: <Calendar size={20} /> },
        { name: 'My Patients', href: '/doctor/patients', icon: <User size={20} /> },
        { name: 'Health Articles', href: '/doctor/resources', icon: <BookOpen size={20} /> },
        { name: 'Profile', href: '/doctor/profile', icon: <Settings size={20} /> },
    ];

    const adminLinks = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Manage Users', href: '/admin/users', icon: <User size={20} /> },
        { name: 'Health Resources', href: '/admin/resources', icon: <BookOpen size={20} /> },
        { name: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
    ];

    const links = role === 'patient' ? patientLinks : (role === 'doctor' ? doctorLinks : adminLinks);

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
            <div className="p-6">
                <Link href="/" className="text-2xl font-bold gradient-text">
                    HealthConnect
                </Link>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-2xl transition-all group",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-gray-500 hover:bg-primary/5 hover:text-primary"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                {link.icon}
                                <span className="font-semibold">{link.name}</span>
                            </div>
                            {isActive && <ChevronRight size={16} />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-50">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all font-semibold"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
