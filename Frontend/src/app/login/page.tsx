'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiCall } from '@/lib/api';
import Button from '@/components/Button';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const data = await apiCall('/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            login(data.data.token, data.data.user);

            // Redirect based on role
            const role = data.data.user.role;
            if (role === 'admin') router.push('/admin/dashboard');
            else if (role === 'doctor') router.push('/doctor/dashboard');
            else router.push('/patient/dashboard');
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
            <div className="absolute top-0 left-0 w-full h-96 bg-primary hero-curved -z-10" />

            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <Link href="/" className="text-4xl font-bold text-white mb-2 inline-block font-heading tracking-tight">
                        HealthConnect<span className="text-white ml-0.5">.</span>
                    </Link>
                    <h2 className="text-2xl font-normal text-white/80 font-heading">Welcome Back</h2>
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100">
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center text-sm border border-red-100 italic">
                            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest mb-2 ml-4">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={20} />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all italic text-primary"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2 px-4">
                                <label className="block text-xs font-bold text-primary/40 uppercase tracking-widest">Password</label>
                                <Link href="/forgot-password" title="Forgot Password?" className="text-xs text-primary/60 hover:text-primary hover:underline italic font-bold">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={20} />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all italic text-primary"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full py-4 rounded-2xl bg-primary text-white hover:bg-primary-light transition-all shadow-xl shadow-primary/20" size="lg" isLoading={isLoading}>
                            Sign In <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-50 text-center text-sm text-gray-500">
                        Don't have an account? {' '}
                        <Link href="/register" className="text-primary font-bold hover:underline italic">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
