'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Stethoscope, MessageSquare, BookOpen, MapPin, Calendar, Activity } from 'lucide-react';

const services = [
    {
        title: 'Consult Experts',
        desc: 'Connect with specialized doctors across various fields for personalized consultations.',
        icon: <Stethoscope size={28} />,
        color: 'bg-blue-100 text-blue-600'
    },
    {
        title: 'Virtual Chat',
        desc: 'Instant messaging with healthcare providers for quick advice and follow-ups.',
        icon: <MessageSquare size={28} />,
        color: 'bg-purple-100 text-purple-600'
    },
    {
        title: 'Health Resources',
        desc: 'Access a vast library of verified medical articles, guides, and wellness tips.',
        icon: <BookOpen size={28} />,
        color: 'bg-green-100 text-green-600'
    },
    {
        title: 'Find Clinics',
        desc: 'Locate top-rated clinics and hospitals near you with integrated maps.',
        icon: <MapPin size={28} />,
        color: 'bg-red-100 text-red-600'
    }
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#f8fafc]">
            <Navbar />

            <section className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to manage your health and connect with the best medical care.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, i) => (
                            <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl premium-shadow group hover:bg-primary/5 transition-all">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${service.color}`}>
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed">{service.desc}</p>
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
