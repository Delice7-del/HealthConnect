'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Target, Heart, Shield } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#f8fafc]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                    >
                        Our Mission is to <br />
                        <span className="gradient-text">Democratize Healthcare</span>
                    </motion.h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        HealthConnect was founded with a simple goal: to make expert healthcare advice and
                        connection to professional medical providers accessible to everyone, anywhere in the world.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-white rounded-3xl premium-shadow space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Target size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Our Vision</h3>
                            <p className="text-gray-500">To create a world where quality healthcare is just a click away for every individual.</p>
                        </div>

                        <div className="p-8 bg-white rounded-3xl premium-shadow space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Heart size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Our Compassion</h3>
                            <p className="text-gray-500">We put patients at the center of everything we do, ensuring personalized and empathetic care.</p>
                        </div>

                        <div className="p-8 bg-white rounded-3xl premium-shadow space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Our Trust</h3>
                            <p className="text-gray-500">Every provider on our platform is thoroughly vetted to ensure the highest standards of medical safety.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
