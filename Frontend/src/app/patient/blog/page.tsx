'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import { BookOpen, Search, Clock, ChevronRight, User } from 'lucide-react';

export const BLOG_POSTS = [
    {
        id: 'heart-health-habits',
        title: '10 Simple Habits for a Healthier Heart',
        category: 'Heart Health',
        author: 'Dr. Sarah Johnson',
        date: 'Jan 5, 2024',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
        content: 'Your heart is the engine of your body. Maintaining it doesn\'t always require drastic changes. Small, consistent habits like a 15-minute daily walk, reducing sodium intake, and managing stress through deep breathing can significantly lower your risk of cardiovascular disease. This article explores actionable steps you can take starting today...'
    },
    {
        id: 'sleep-mental-health',
        title: 'The Invisible Link Between Sleep and Mental Health',
        category: 'Mental Health',
        author: 'Dr. Robert Chen',
        date: 'Jan 3, 2024',
        readTime: '8 min read',
        image: '/images/blog/mental_health.png?v=2',
        content: 'Sleep is not just a passive state of rest; it is an active period of neurological recovery. Chronic sleep deprivation has been linked to increased anxiety, depression, and cognitive decline. By prioritizing a consistent sleep schedule and optimizing your bedroom environment, you can build a stronger foundation for emotional resilience...'
    },
    {
        id: 'nutrition-hydration',
        title: 'Hydration: The Foundation of Proper Nutrition',
        category: 'Nutrition',
        author: 'Dr. Emily White',
        date: 'Jan 2, 2024',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
        content: 'Water is essential for every metabolic process in the body. While we often focus on macronutrients like proteins and carbs, hydration is frequently overlooked. Proper water intake aids digestion, regulates body temperature, and improves brain function. Learn how to calculate your daily water needs and tips for staying hydrated throughout a busy day...'
    },
    {
        id: 'wellness-mindfulness',
        title: 'Integrating Mindfulness into Your Daily Wellness Routine',
        category: 'Wellness',
        author: 'Dr. Alisa Meyer',
        date: 'Dec 28, 2023',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
        content: 'Wellness is a holistic journey. Mindfulness—the practice of being present in the moment—is a powerful tool to reduce the noise of modern life. Whether it\'s mindful eating, conscious breathing, or a short meditation session after work, these practices help lower cortisol levels and improve overall life satisfaction...'
    },
    {
        id: 'pediatrics-vaccination',
        title: 'Childhood Vaccination: A Guide for Modern Parents',
        category: 'Pediatrics',
        author: 'Dr. Kevin Miller',
        date: 'Dec 20, 2023',
        readTime: '10 min read',
        image: '/images/blog/pediatrics.png?v=2',
        content: 'Protecting your child starts with prevention. Vaccines are one of the most successful public health interventions in history. This comprehensive guide addresses common concerns, explains the recommended immunization schedule for 2024, and discusses why these milestones are crucial for your child\'s long-term immune system development...'
    }
];

export default function PatientBlog() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Wellness', 'Nutrition', 'Mental Health', 'Heart Health', 'Pediatrics'];

    const filteredPosts = BLOG_POSTS.filter(post => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             post.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
                <div className="mb-12 relative h-[400px] rounded-[40px] overflow-hidden group cursor-pointer shadow-2xl shadow-primary/5">
                    <img
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200"
                        alt="Featured"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 text-white">
                        <span className="bg-primary/90 px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-4">Featured Article</span>
                        <h2 className="text-4xl font-bold mb-4 max-w-2xl leading-tight">Modern Approaches to Preventive Healthcare in 2024</h2>
                        <div className="flex items-center gap-6 text-white/80">
                            <span className="flex items-center gap-2 font-medium"><User size={16} /> Dr. James Wilson</span>
                            <span className="flex items-center gap-2 font-medium"><Clock size={16} /> 12 min read</span>
                        </div>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <Link 
                            key={post.id} 
                            href={`/patient/blog/${post.id}`}
                            className="bg-white rounded-[32px] overflow-hidden border border-gray-100 premium-shadow group hover:border-primary/20 transition-all flex flex-col h-full"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex-1 group-hover:text-primary transition-colors leading-snug">
                                    {post.title}
                                </h3>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                                            {post.author.charAt(4)}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-800">{post.author}</p>
                                            <p className="text-[10px] text-gray-400 font-medium">{post.date} • {post.readTime}</p>
                                        </div>
                                    </div>
                                    <div className="text-gray-400 group-hover:text-primary transition-colors pr-2">
                                        <ChevronRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
                        <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-800">No articles found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your category or search query.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
