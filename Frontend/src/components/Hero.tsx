'use client';

import React from 'react';
import Button from './Button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Clock, Users } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden gpu-boost">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                        Modern Healthcare Platform
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                        Connecting Patients with <br />
                        <span className="gradient-text">Top Healthcare Experts</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Experience the future of healthcare with seamless appointment booking,
                        expert consultations, and trusted health resources all in one place.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link href="/register">
                            <Button size="xl">
                                Get Started <ChevronRight size={20} className="ml-2" />
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="outline" size="xl">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Stats/Features */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <div className="p-8 bg-white glass rounded-3xl premium-shadow space-y-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                            <ShieldCheck size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Verified Experts</h3>
                        <p className="text-gray-500">Every doctor on our platform goes through a strict verification process.</p>
                    </div>

                    <div className="p-8 bg-white glass rounded-3xl premium-shadow space-y-4 transition-transform hover:-translate-y-2">
                        <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto text-secondary">
                            <Clock size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">24/7 Availability</h3>
                        <p className="text-gray-500">Book appointments or consult with doctors anytime, anywhere.</p>
                    </div>

                    <div className="p-8 bg-white glass rounded-3xl premium-shadow space-y-4">
                        <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto text-accent">
                            <Users size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Patient Centric</h3>
                        <p className="text-gray-500">Tailored health dashboards and personalized care for every patient.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
