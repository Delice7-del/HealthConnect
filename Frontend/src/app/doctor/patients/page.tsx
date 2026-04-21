'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Search, User, Phone, Mail, Calendar, MoreVertical, Shield } from 'lucide-react';
import Button from '@/components/Button';
import { appointmentService } from '@/services/appointmentService';
import RegisterPatientModal from '@/components/RegisterPatientModal';
import PatientHistoryModal from '@/components/PatientHistoryModal';

export default function DoctorPatients() {
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState<any[]>([]);
    const [newlyRegistered, setNewlyRegistered] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [historyModal, setHistoryModal] = useState({ isOpen: false, patientId: '', patientName: '' });

    useEffect(() => {
        try {
            const cached = localStorage.getItem('newlyRegisteredPatients');
            if (cached) setNewlyRegistered(JSON.parse(cached));
        } catch (e) {}
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const data = await appointmentService.getMyAppointments();
            const apps = data.data.appointments;
            
            // Deduplicate patients
            const uniquePatientsMap = new Map();
            apps.forEach((app: any) => {
                if (app.patient && !uniquePatientsMap.has(app.patient._id)) {
                    uniquePatientsMap.set(app.patient._id, {
                        ...app.patient,
                        id: app.patient._id,
                        lastVisit: new Date(app.date).toLocaleDateString(),
                    });
                } else if (app.patient && uniquePatientsMap.has(app.patient._id)) {
                    const existing = uniquePatientsMap.get(app.patient._id);
                    if (new Date(app.date) > new Date(existing.lastVisit)) {
                        existing.lastVisit = new Date(app.date).toLocaleDateString();
                    }
                }
            });
            
            setPatients(Array.from(uniquePatientsMap.values()));
        } catch (err) {
            console.error('Failed to fetch patients', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSuccess = (newPatient?: any) => {
        if (newPatient) {
            setNewlyRegistered(prev => {
                const arr = [...prev];
                if (!arr.find(p => p.id === newPatient.id)) {
                    arr.push(newPatient);
                }
                localStorage.setItem('newlyRegisteredPatients', JSON.stringify(arr));
                return arr;
            });
        }
        fetchPatients();
    };

    // Merge fetched patients with newly registered patients (deduplicated)
    const combinedPatients = Array.from(new Map([...patients, ...newlyRegistered].map(item => [item.id, item])).values());

    const filteredPatients = combinedPatients.filter(p => 
        (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (p.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="doctor" />

            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Patient Directory</h1>
                        <p className="text-gray-500 mt-1">Access and manage your patient's medical records.</p>
                    </div>
                    <div className="relative w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full py-20 flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredPatients.map((patient) => (
                        <div key={patient.id} className="bg-white p-6 rounded-3xl premium-shadow border border-gray-100 hover:border-primary/20 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-xl font-bold">
                                    {(patient.name || 'P').charAt(0).toUpperCase()}
                                </div>
                                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-1">{patient.name}</h3>
                            <p className="text-gray-500 text-sm mb-6">Patient ID: #HC-{patient.id.padStart(4, '0')}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail size={14} className="text-gray-400" /> {patient.email || 'No email provided'}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Phone size={14} className="text-gray-400" /> {patient.phone || 'No phone provided'}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Calendar size={14} className="text-gray-400" /> Last Visit: {patient.lastVisit}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    <Shield size={10} /> Insured
                                </span>
                                <button onClick={() => setHistoryModal({ isOpen: true, patientId: patient.id, patientName: patient.name })} className="text-primary text-sm font-bold hover:underline">View History</button>
                            </div>
                        </div>
                    ))}

                    <button onClick={() => setIsRegisterOpen(true)} className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-primary/50 hover:text-primary transition-all group">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 mb-4 group-hover:bg-primary/10">
                            <User size={24} />
                        </div>
                        <p className="font-bold">Register New Patient</p>
                    </button>
                </div>
            </main>
            
            <RegisterPatientModal 
                isOpen={isRegisterOpen} 
                onClose={() => setIsRegisterOpen(false)} 
                onSuccess={handleRegisterSuccess} 
            />
            
            <PatientHistoryModal 
                isOpen={historyModal.isOpen} 
                onClose={() => setHistoryModal({ ...historyModal, isOpen: false })} 
                patientId={historyModal.patientId} 
                patientName={historyModal.patientName} 
            />
        </div>
    );
}
