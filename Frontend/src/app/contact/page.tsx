'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/Button";
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#f8fafc]">
            <Navbar />

            <section className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div className="space-y-12">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                                <p className="text-gray-600 text-lg">Have questions? Our team is here to help you navigate your healthcare journey.</p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Email Us</h4>
                                        <p className="text-gray-600">hello@healthconnect.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Call Support</h4>
                                        <p className="text-gray-600">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Visit Us</h4>
                                        <p className="text-gray-600">123 Health Ave, Medical City, CA 90210</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 md:p-12 rounded-3xl premium-shadow border border-gray-100">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="name@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <Button className="w-full" size="lg">
                                    Send Message <Send size={18} className="ml-2" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
