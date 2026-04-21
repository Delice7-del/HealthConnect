'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Activity, Search } from 'lucide-react';
import { appointmentService } from '@/services/appointmentService';
import { cn } from '@/lib/utils';
import Button from './Button';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    patientId: string;
    patientName: string;
}

export default function PatientHistoryModal({ isOpen, onClose, patientId, patientName }: Props) {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && patientId) {
            fetchHistory();
        }
    }, [isOpen, patientId]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const data = await appointmentService.getMyAppointments();
            // Filter appointments by patient
            const patientApps = data.data.appointments.filter(
                (app: any) => app.patient?._id === patientId || app.patient === patientId
            );
            // Sort by date descending
            setAppointments(patientApps.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        } catch (err) {
            console.error('Failed to fetch history', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-600';
            case 'completed': return 'bg-blue-100 text-blue-600';
            case 'pending': return 'bg-yellow-100 text-yellow-600';
            case 'canceled': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[85vh]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Patient History</h2>
                        <p className="text-sm text-gray-500 mt-1">{patientName}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors">
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto flex-1">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                        </div>
                    ) : appointments.length > 0 ? (
                        <div className="space-y-6">
                            <div className="relative border-l-2 border-primary/20 ml-6 space-y-8 pb-4">
                                {appointments.map((app) => (
                                    <div key={app._id} className="relative pl-8">
                                        <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-4 border-primary shadow-sm" />
                                        
                                        <div className="bg-white p-5 rounded-2xl border border-gray-100 premium-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                                        {app.reason}
                                                    </h4>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={14} /> {new Date(app.date).toLocaleDateString()}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={14} /> {app.time}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(app.status))}>
                                                    {app.status}
                                                </span>
                                            </div>
                                            {app.notes && (
                                                <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
                                                    <strong>Doctor Notes:</strong> {app.notes}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Activity className="mx-auto text-gray-300 mb-4" size={48} />
                            <h3 className="text-xl font-bold text-gray-800">No History Found</h3>
                            <p className="text-gray-500 mt-2">This patient has no past appointments.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
