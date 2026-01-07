'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileText, CheckCircle, AlertCircle, Scale } from 'lucide-react';

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-[#f8fafc]">
            <Navbar />

            <section className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <div className="bg-white p-8 md:p-12 rounded-3xl premium-shadow border border-gray-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Scale size={24} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
                                <p className="text-gray-500 text-sm">Last updated: January 2024</p>
                            </div>
                        </div>

                        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                            <section>
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <CheckCircle size={18} className="text-primary" /> 1. Acceptance of Terms
                                </h2>
                                <p>
                                    By accessing and using HealthConnect, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using the platform.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <FileText size={18} className="text-primary" /> 2. Professional Services
                                </h2>
                                <p>
                                    HealthConnect facilitates connections between patients and healthcare providers. While we verify credentials, the medical advice provided during consultations is the sole responsibility of the respective healthcare professional.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <AlertCircle size={18} className="text-primary" /> 3. User Responsibilities
                                </h2>
                                <p>
                                    Users are responsible for providing accurate health information and maintaining the confidentiality of their account credentials. Misuse of the platform may result in account suspension.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Scale size={18} className="text-primary" /> 4. Limitation of Liability
                                </h2>
                                <p>
                                    HealthConnect acts as a platform provider. We are not liable for direct or indirect damages resulting from the use of our services or the interactions between users and providers.
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
