'use client';

import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    'Cardiology',
    'Anaesthesiology',
    'Bariatric Surgery',
    'Blood Bank',
    'Endocrinology & Diabetology',
    'Dental Care',
];

export default function CategorizedServices() {
    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left Side Content */}
                    <div className="space-y-8">
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-normal text-primary font-heading leading-tight"
                        >
                            See what we provide to <br />
                            keep you healthy
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-500 text-lg leading-relaxed max-w-xl italic"
                        >
                            With World-class Preventive, Prescriptive & Curative Medical Practices,
                            we have been at the helm of nurturing healthy living since the turn of the New Century.
                        </motion.p>
                    </div>

                    {/* Right Side Vertical List */}
                    <div className="relative">
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
                        <div className="space-y-4 pr-6 text-right">
                            {categories.map((cat, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group cursor-pointer flex items-center justify-end gap-6"
                                >
                                    <span className="text-xl font-normal text-gray-400 group-hover:text-primary font-heading transition-all duration-300 transform group-hover:-translate-x-2">
                                        {cat}
                                    </span>
                                    <div className="w-1 h-8 bg-transparent group-hover:bg-primary transition-all duration-300 rounded-full" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
