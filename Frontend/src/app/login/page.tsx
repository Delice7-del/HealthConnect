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

            login(data.token, data.data.user);

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
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-primary/5 -z-10 blur-3xl animate-pulse" />

            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <Link href="/" className="text-3xl font-bold gradient-text mb-2 inline-block">
                        HealthConnect
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-500">Sign in to access your health dashboard</p>
                </div>

                <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center text-sm border border-red-100">
                            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-sm font-semibold text-gray-700">Password</label>
                                <Link href="/forgot-password" title="Forgot Password?" className="text-xs text-primary hover:underline">Forgot password?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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

                        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                            Sign In <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </form>

                    {/* Quick Login for Testing */}
                    <div className="mt-8 space-y-3">
                        <p className="text-xs text-center text-gray-400 font-medium uppercase tracking-wider">Quick Login (Development Only)</p>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setFormData({ email: 'admin@healthconnect.com', password: 'Admin@123' })}
                                className="text-[10px] py-2 bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-500 rounded-xl border border-gray-100 transition-all font-bold"
                            >
                                Admin
                            </button>
                            <button
                                onClick={() => setFormData({ email: 'doctor@test.com', password: 'Password@123' })}
                                className="text-[10px] py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-500 rounded-xl border border-gray-100 transition-all font-bold"
                            >
                                Doctor
                            </button>
                            <button
                                onClick={() => setFormData({ email: 'patient@test.com', password: 'Password@123' })}
                                className="text-[10px] py-2 bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-500 rounded-xl border border-gray-100 transition-all font-bold"
                            >
                                Patient
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-50 text-center text-sm text-gray-500">
                        Don't have an account? {' '}
                        <Link href="/register" className="text-primary font-bold hover:underline">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
