'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import { apiCall } from '@/lib/api';
import { User, Shield, Check, X, Search, Filter, ShieldAlert, MoreVertical } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

export default function ManageUsers() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        if (user) {
            fetchUsers();
        }
    }, [user, authLoading]);

    const fetchUsers = async () => {
        try {
            const data = await apiCall('/users');
            setUsers(data.data.users);
        } catch (err) {
            console.error('Failed to fetch users', err);
        } finally {
            setLoading(false);
        }
    };

    const handleApproveDoctor = async (id: string) => {
        try {
            await apiCall(`/users/${id}/approve`, { method: 'PUT' });
            fetchUsers();
        } catch (err) {
            alert('Approval failed');
        }
    };

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="admin" />

            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                        <p className="text-gray-500 mt-1">Manage global users, verify doctors, and assign roles.</p>
                    </div>
                    <Button>Invite Member</Button>
                </header>

                <div className="bg-white rounded-3xl premium-shadow border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/50">
                        <div className="flex p-1 bg-white rounded-2xl border border-gray-100">
                            {['all', 'patient', 'doctor', 'admin', 'pending'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all",
                                        filter === f ? "bg-primary text-white shadow-md shadow-primary/20" : "text-gray-500 hover:text-gray-700"
                                    )}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/20">
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Joined Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-gray-400">Loading users...</td>
                                    </tr>
                                ) : users.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">{u.name}</p>
                                                    <p className="text-[10px] text-gray-500">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                                                u.role === 'admin' ? "bg-red-50 text-red-600" :
                                                    u.role === 'doctor' ? "bg-purple-50 text-purple-600" :
                                                        "bg-blue-50 text-blue-600"
                                            )}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-2 h-2 rounded-full", u.status === 'active' ? "bg-green-500" : "bg-yellow-500")}></div>
                                                <span className="text-xs text-gray-600 capitalize">{u.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            {new Date(u.createdAt || Date.now()).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {u.role === 'doctor' && u.status === 'pending' ? (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleApproveDoctor(u.id)}
                                                        className="bg-primary text-white p-1.5 rounded-lg hover:bg-primary/90 shadow-sm"
                                                        title="Approve Doctor"
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                    <button className="bg-white border text-gray-400 p-1.5 rounded-lg hover:text-red-500" title="Reject">
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button className="text-gray-300 hover:text-primary transition-colors">
                                                    <MoreVertical size={18} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
