'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from 'framer-motion';
import { Target, Heart, Shield } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-48 pb-32 overflow-hidden bg-primary hero-curved bg-[url('/images/about_bg.png')] bg-cover bg-center bg-no-repeat bg-blend-overlay px-4 md:px-8 text-center text-white relative z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/30 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-normal mb-8 font-heading leading-tight"
                    >
                        Our Mission is to <br />
                        <span className="italic font-light opacity-80">Democratize Healthcare</span>
                    </motion.h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
                        HealthConnect was founded with a simple goal: to make expert healthcare advice and
                        connection to professional medical providers accessible to everyone, anywhere in the world.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32 relative z-0">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="p-10 bg-white border border-gray-100 rounded-[3rem] shadow-xl shadow-gray-100/50 space-y-6 hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                                <Target size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary font-heading">Our Vision</h3>
                            <p className="text-gray-500 leading-relaxed italic">To create a world where quality healthcare is just a click away for every individual.</p>
                        </div>

                        <div className="p-10 bg-white border border-gray-100 rounded-[3rem] shadow-xl shadow-gray-100/50 space-y-6 hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                                <Heart size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary font-heading">Our Compassion</h3>
                            <p className="text-gray-500 leading-relaxed italic">We put patients at the center of everything we do, ensuring personalized and empathetic care.</p>
                        </div>

                        <div className="p-10 bg-white border border-gray-100 rounded-[3rem] shadow-xl shadow-gray-100/50 space-y-6 hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary font-heading">Our Trust</h3>
                            <p className="text-gray-500 leading-relaxed italic">Every provider on our platform is thoroughly vetted to ensure the highest standards of medical safety.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
