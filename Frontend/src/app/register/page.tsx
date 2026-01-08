'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiCall } from '@/lib/api';
import Button from '@/components/Button';
import { User, Mail, Lock, Phone, Stethoscope, Briefcase, Award, ArrowRight, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [role, setRole] = useState<'patient' | 'doctor'>('patient');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        doctorDetails: {
            specialization: '',
            licenseNumber: '',
            experience: 0,
            hospital: '',
        }
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                role,
                doctorDetails: role === 'doctor' ? formData.doctorDetails : undefined
            };

            const data = await apiCall('/auth/register', {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            login(data.token, data.data.user);

            // Redirect based on role
            const userRole = data.data.user.role;
            if (userRole === 'admin') router.push('/admin/dashboard');
            else if (userRole === 'doctor') router.push('/doctor/dashboard');
            else router.push('/patient/dashboard');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4 flex justify-center items-center">
            <div className="absolute top-0 right-0 w-full h-1/2 bg-accent/5 -z-10 blur-3xl" />

            <div className="w-full max-w-2xl">
                <div className="text-center mb-10">
                    <Link href="/" className="text-3xl font-bold gradient-text mb-2 inline-block">
                        HealthConnect
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
                    <p className="text-gray-500">Join our healthcare community today</p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-3xl premium-shadow border border-gray-100">
                    {/* Role Switcher */}
                    <div className="flex p-1 bg-gray-100 rounded-2xl mb-10">
                        <button
                            onClick={() => setRole('patient')}
                            className={`flex-1 flex items-center justify-center py-3 rounded-xl font-bold transition-all ${role === 'patient' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <User size={18} className="mr-2" /> Patient
                        </button>
                        <button
                            onClick={() => setRole('doctor')}
                            className={`flex-1 flex items-center justify-center py-3 rounded-xl font-bold transition-all ${role === 'doctor' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Stethoscope size={18} className="mr-2" /> Doctor
                        </button>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center text-sm border border-red-100">
                            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="tel"
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {role === 'doctor' && (
                            <div className="pt-6 border-t border-gray-100 space-y-6">
                                <h3 className="font-bold text-gray-800">Professional Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Specialization</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                required
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                placeholder="Cardiologist"
                                                value={formData.doctorDetails.specialization}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    doctorDetails: { ...formData.doctorDetails, specialization: e.target.value }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">License Number</label>
                                        <div className="relative">
                                            <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                required
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                placeholder="LIC-123456"
                                                value={formData.doctorDetails.licenseNumber}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    doctorDetails: { ...formData.doctorDetails, licenseNumber: e.target.value }
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-4">
                            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                                Create Account <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </div>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-50 text-center text-sm text-gray-500">
                        Already have an account? {' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
