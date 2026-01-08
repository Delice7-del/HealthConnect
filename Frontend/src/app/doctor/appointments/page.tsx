'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import { apiCall } from '@/lib/api';
import { Appointment } from '@/types';
import { Calendar, Clock, User, Filter, Check, X, MoreVertical } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

export default function DoctorAppointments() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }
        if (user) {
            fetchAppointments();
        }
    }, [user, authLoading]);

    const fetchAppointments = async () => {
        try {
            const data = await apiCall('/appointments/my');
            setAppointments(data.data.appointments);
        } catch (err) {
            console.error('Failed to fetch appointments', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await apiCall(`/appointments/${id}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            fetchAppointments();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="doctor" />

            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
                        <p className="text-gray-500 mt-1">Review and manage your consultation requests.</p>
                    </div>
                </header>

                <div className="bg-white rounded-3xl premium-shadow border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-gray-800">Recent Requests</h3>
                        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
                            <Filter size={16} /> Filter
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50/30">
                                    <th className="px-6 py-4">Patient</th>
                                    <th className="px-6 py-4">Date & Time</th>
                                    <th className="px-6 py-4">Reason</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                        </td>
                                    </tr>
                                ) : appointments.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold">
                                                    {(app.patient as any).name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800">{(app.patient as any).name}</p>
                                                    <p className="text-xs text-gray-500">ID: {(app.patient as any).id?.slice(-6)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <p className="font-medium">{new Date(app.date).toLocaleDateString()}</p>
                                            <p className="text-xs">{app.time}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{app.reason}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                                app.status === 'confirmed' ? "bg-green-100 text-green-600" :
                                                    app.status === 'pending' ? "bg-yellow-100 text-yellow-600" :
                                                        "bg-red-100 text-red-600"
                                            )}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {app.status === 'pending' ? (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, 'confirmed')}
                                                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, 'canceled')}
                                                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
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
