'use client';

import React from 'react';
import { motion } from 'framer-motion';

const doctors = [
    { name: 'Dr. Jane Cooper', role: 'Cardiologist', img: '/images/dr_jane.png' },
    { name: 'Dr. John Doe', role: 'Neurologist', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=500' },
    { name: 'Dr. Sarah Wilson', role: 'Pediatrician', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=500' },
];

export default function DoctorsSection() {
    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {doctors.map((doc, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200/50 group"
                        >
                            <div className="h-96 bg-gray-100 relative overflow-hidden">
                                {/* Placeholder image - since user said no generation, I'll just use a styled div if image fails */}
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/0 transition-all duration-500" />
                                <img 
                                    src={doc.img} 
                                    alt={doc.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <div className="p-8 text-center">
                                <h3 className="text-2xl font-normal text-primary font-heading mb-1">{doc.name}</h3>
                                <p className="text-gray-400 italic text-sm uppercase tracking-widest font-bold">{doc.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
