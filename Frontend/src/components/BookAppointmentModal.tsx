'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Check, AlertCircle } from 'lucide-react';
import Button from './Button';
import { apiCall } from '@/lib/api';
import { userService } from '@/services/userService';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function BookAppointmentModal({ isOpen, onClose, onSuccess }: Props) {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        doctor: '',
        date: '',
        time: '',
        reason: '',
    });

    useEffect(() => {
        if (isOpen) {
            fetchDoctors();
        }
    }, [isOpen]);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const data = await userService.getDoctors();
            setDoctors(data.data.doctors);
        } catch (err: any) {
            setError('Failed to fetch doctors. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await apiCall('/appointments/book', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            onSuccess();
            onClose();
            // Reset form
            setFormData({ doctor: '', date: '', time: '', reason: '' });
        } catch (err: any) {
            setError(err.message || 'Failed to book appointment.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">Book New Appointment</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors">
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center text-sm border border-red-100">
                            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Specialist</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                                    value={formData.doctor}
                                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                                >
                                    <option value="">Select a Doctor</option>
                                    {doctors.map(doc => (
                                        <option key={doc._id} value={doc._id}>
                                            Dr. {doc.name} - {doc.doctorDetails?.specialization}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Time Slot</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <select
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    >
                                        <option value="">Select Time</option>
                                        {['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Visit</label>
                            <textarea
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[100px]"
                                placeholder="Briefly describe your symptoms or reason for the appointment..."
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                            isLoading={submitting}
                        >
                            Book Appointment
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
