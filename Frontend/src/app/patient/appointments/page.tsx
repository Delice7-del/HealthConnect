'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import { apiCall } from '@/lib/api';
import { Appointment } from '@/types';
import { Calendar, Clock, MapPin, Search, Filter, MoreVertical, X, Check } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import BookAppointmentModal from '@/components/BookAppointmentModal';

export default function PatientAppointments() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'canceled'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const filteredAppointments = appointments.filter(app =>
        filter === 'all' ? true : app.status === filter
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-600';
            case 'pending': return 'bg-yellow-100 text-yellow-600';
            case 'canceled': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="patient" />

            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
                        <p className="text-gray-500 mt-1">Manage your consultations and visit history.</p>
                    </div>
                    <Button onClick={() => setIsModalOpen(true)}>
                        Book New Appointment
                    </Button>
                </header>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
                    <div className="flex p-1 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        {['all', 'pending', 'confirmed', 'completed', 'canceled'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all",
                                    filter === f ? "bg-primary text-white shadow-md shadow-primary/20" : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search appointments..."
                            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Appointments List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredAppointments.length > 0 ? (
                        filteredAppointments.map((app) => (
                            <div key={app.id} className="bg-white p-6 rounded-3xl premium-shadow border border-gray-100 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/20 transition-all">
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex flex-col items-center justify-center border border-gray-100 group-hover:bg-primary/5 transition-colors">
                                    <span className="text-gray-800 font-bold text-lg">{new Date(app.date).getDate()}</span>
                                    <span className="text-gray-400 text-[10px] font-bold uppercase">{new Date(app.date).toLocaleString('default', { month: 'short' })}</span>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h4 className="font-bold text-gray-900 text-lg">Dr. {(app.doctor as any).name || 'Unknown'}</h4>
                                    <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-1">
                                        <Clock size={14} /> {app.time} • {(app.doctor as any).doctorDetails?.specialization}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center md:items-end gap-2">
                                    <span className={cn("px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider", getStatusColor(app.status))}>
                                        {app.status}
                                    </span>
                                    <div className="flex gap-2">
                                        {app.status === 'pending' && (
                                            <button className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors" title="Cancel">
                                                <X size={18} />
                                            </button>
                                        )}
                                        <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                            <h3 className="text-xl font-bold text-gray-800">No appointments found</h3>
                            <p className="text-gray-500 mt-2">Try changing your filters or book a new consultation.</p>
                            <Button variant="outline" className="mt-6" onClick={() => setIsModalOpen(true)}>
                                Book My First Appointment
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            <BookAppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchAppointments}
            />
        </div>
    );
}
