'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { BookOpen, Search, Heart, Share2, Clock, ChevronRight, User } from 'lucide-react';
import Button from '@/components/Button';

export default function PatientBlog() {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Wellness', 'Nutrition', 'Mental Health', 'Heart Health', 'Pediatrics'];

    const posts = [
        {
            title: '10 Simple Habits for a Healthier Heart',
            category: 'Heart Health',
            author: 'Dr. Sarah Johnson',
            date: 'Jan 5, 2024',
            readTime: '5 min read',
            image: 'https://tse4.mm.bing.net/th/id/OIP.FfogpkMz8Vty7Fc48pMQkAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
        },
        {
            title: 'Understanding the Impact of Sleep on Mental Health',
            category: 'Mental Health',
            author: 'Dr. Robert Chen',
            date: 'Jan 3, 2024',
            readTime: '8 min read',
            image: 'https://tse4.mm.bing.net/th/id/OIF.ITZLzF12GqoatJZShpacqw?rs=1&pid=ImgDetMain&o=7&rm=3',
        },
        {
            title: 'Nutrition: Why Hydration Matters More Than You Think',
            category: 'Nutrition',
            author: 'Dr. Emily White',
            date: 'Jan 2, 2024',
            readTime: '4 min read',
            
            image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400',
        }
    ];

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="patient" />

            <main className="flex-1 p-8">
                <header className="mb-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Health Blog</h1>
                        <div className="relative w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${activeCategory === cat
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'bg-white text-gray-500 border border-gray-100 hover:text-primary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Featured Post Placeholder */}
                <div className="mb-12 relative h-[400px] rounded-[40px] overflow-hidden group cursor-pointer">
                    <img
                        src="https://cchmainsitev2dev.blob.core.windows.net/container1/wp-content/uploads/2024/02/2024-Outlook-blog.jpg"
                        alt="Featured"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 text-white">
                        <span className="bg-primary/90 px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-4">Featured Article</span>
                        <h2 className="text-4xl font-bold mb-4 max-w-2xl leading-tight">Modern Approaches to Preventive Healthcare in 2024</h2>
                        <div className="flex items-center gap-6 text-white/80">
                            <span className="flex items-center gap-2"><User size={16} /> Dr. James Wilson</span>
                            <span className="flex items-center gap-2"><Clock size={16} /> 12 min read</span>
                        </div>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <div key={i} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 premium-shadow group cursor-pointer flex flex-col h-full">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3 inline-block">
                                    {post.category}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex-1 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-800">{post.author}</p>
                                            <p className="text-[10px] text-gray-500">{post.date}</p>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-primary transition-colors">
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
