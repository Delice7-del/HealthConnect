'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Stethoscope, MessageSquare, BookOpen, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
    {
        title: 'Consult Experts',
        desc: 'Connect with specialized doctors across various fields for personalized consultations.',
        icon: <Stethoscope size={32} />,
    },
    {
        title: 'Virtual Chat',
        desc: 'Instant messaging with healthcare providers for quick advice and follow-ups.',
        icon: <MessageSquare size={32} />,
    },
    {
        title: 'Health Resources',
        desc: 'Access a vast library of verified medical articles, guides, and wellness tips.',
        icon: <BookOpen size={32} />,
    },
    {
        title: 'Find Clinics',
        desc: 'Locate top-rated clinics and hospitals near you with integrated maps.',
        icon: <MapPin size={32} />,
    }
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-40 pb-32 bg-primary hero-curved text-white px-4 md:px-8 text-center relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-normal mb-6 font-heading"
                    >
                        Our <span className="italic font-light opacity-80">Comprehensive</span> Services
                    </motion.h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                        Everything you need to manage your health and connect with the best medical care with ease and precision.
                    </p>
                </div>
            </section>

            <section className="py-32 relative z-0">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {services.map((service, i) => (
                            <div key={i} className="group flex gap-8 p-10 bg-white border border-gray-100 rounded-[3rem] shadow-xl shadow-gray-100/50 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2">
                                <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    {service.icon}
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-2xl font-bold text-primary mb-3 font-heading">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed italic">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
