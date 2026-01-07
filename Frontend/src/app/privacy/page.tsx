'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-[#f8fafc]">
            <Navbar />

            <section className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <div className="bg-white p-8 md:p-12 rounded-3xl premium-shadow border border-gray-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                                <p className="text-gray-500 text-sm">Last updated: January 2024</p>
                            </div>
                        </div>

                        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                            <section>
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Lock size={18} className="text-primary" /> 1. Information Collection
                                </h2>
                                <p>
                                    At HealthConnect, we collect essential information to provide you with a seamless healthcare experience. This includes personal identification (name, email, phone) and health-related data you choose to share with providers.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Eye size={18} className="text-primary" /> 2. Data Usage
                                </h2>
                                <p>
                                    Your data is used strictly for appointment scheduling, medical consultations, and platform personalization. We never sell your personal health information to third parties.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Shield size={18} className="text-primary" /> 3. Data Protection
                                </h2>
                                <p>
                                    We implement industry-standard encryption and security protocols (AES-256) to ensure your sensitive data remains confidential and protected from unauthorized access.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <FileText size={18} className="text-primary" /> 4. Your Rights
                                </h2>
                                <p>
                                    You have the right to access, rectify, or delete your data at any time through your profile settings. For comprehensive data exports, please contact our support team.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
