'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, User } from 'lucide-react';
import Button from './Button';
import { userService } from '@/services/userService';

interface Props {
    onBook?: (doctorId: string) => void;
}

export default function AppointmentBar({ onBook }: Props) {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const data = await userService.getDoctors();
            setDoctors(data.data.doctors);
        } catch (err) {
            console.error('Failed to fetch doctors', err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-30">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-4 md:p-8 grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
            >
                <div className="space-y-1 md:border-r border-gray-100 pr-4">
                    <p className="text-xs font-bold text-primary/60 uppercase tracking-widest">Choose Doctor</p>
                    <div className="relative group">
                        <select 
                            className="w-full bg-transparent text-lg font-bold text-primary outline-none appearance-none cursor-pointer pr-8 group-hover:text-primary-light transition-colors"
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                        >
                            <option value="">Select Doctor</option>
                            {doctors.map(doc => (
                                <option key={doc._id} value={doc._id}>Dr. {doc.name}</option>
                            ))}
                        </select>
                        <ChevronDown size={18} className="absolute right-0 top-1.2 text-primary/40 pointer-events-none group-hover:text-primary transition-colors" />
                    </div>
                </div>

                <div className="space-y-1 md:border-r border-gray-100 pr-4">
                    <p className="text-xs font-bold text-primary/60 uppercase tracking-widest">Choose Services</p>
                    <div className="flex justify-between items-center cursor-pointer group">
                        <p className="text-lg font-bold text-primary group-hover:text-primary-light transition-colors">Heart Problem</p>
                        <ChevronDown size={20} className="text-primary/40 group-hover:text-primary transition-colors" />
                    </div>
                </div>

                <div className="space-y-1 md:border-r border-gray-100 pr-4">
                    <p className="text-xs font-bold text-primary/60 uppercase tracking-widest">Choose Date</p>
                    <div className="flex justify-between items-center cursor-pointer group">
                        <p className="text-lg font-bold text-primary group-hover:text-primary-light transition-colors">DD/MM/YYYY</p>
                        <ChevronDown size={20} className="text-primary/40 group-hover:text-primary transition-colors" />
                    </div>
                </div>

                <div className="space-y-1 md:border-r border-gray-100 pr-4">
                    <p className="text-xs font-bold text-primary/60 uppercase tracking-widest">Contact Number</p>
                    <p className="text-lg font-bold text-primary font-heading tracking-tight">+91 968 727 9122</p>
                </div>

                <div>
                    <Button 
                        size="lg" 
                        className="w-full rounded-[1.5rem] shadow-xl shadow-primary/20 bg-white text-primary border-2 border-primary/10 hover:bg-primary hover:text-white hover:scale-[1.02] cursor-pointer active:scale-95 transition-all duration-500"
                        onClick={() => onBook?.(selectedDoctor)}
                    >
                        Book Appointment
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
