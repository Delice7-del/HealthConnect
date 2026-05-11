'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

interface Props {
    onBook?: () => void;
}

export default function Hero({ onBook }: Props) {
    return (
        <section className="relative pt-0 pb-32 overflow-hidden bg-primary hero-curved bg-[url('/images/hero_bg.png')] bg-cover bg-center bg-no-repeat bg-blend-overlay">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/20 pointer-events-none" />
            <div className="pt-48 pb-48 px-4 md:px-12 relative">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-normal text-white mb-6 leading-tight font-heading">
                            A Great Place care for <br />
                            <span className="italic font-light">yourself</span>
                        </h1>
                        <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                            Medical recover is most focused in helping you discover your most beautiful smile.
                        </p>

                        <div className="flex justify-center items-center gap-4 flex-wrap">
                            {/* Book Appointment button */}
                            <button
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 rounded-full font-bold transition-all backdrop-blur-md hover:scale-105 cursor-pointer active:scale-95"
                                onClick={() => onBook?.()}
                            >
                                Book Appointment
                            </button>

                            {/* Join button — links to login/signup */}
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 bg-white text-teal-800 hover:bg-teal-50 px-6 py-2.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/20"
                            >
                                <UserPlus size={16} strokeWidth={2.5} />
                                Join
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
