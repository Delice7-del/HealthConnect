'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { BLOG_POSTS } from '../page';
import { ArrowLeft, Clock, User, Share2, Facebook, Twitter, Link as LinkIcon, ChevronRight } from 'lucide-react';
import Button from '@/components/Button';
import Link from 'next/link';

export default function BlogPostDetail() {
    const params = useParams();
    const router = useRouter();
    const post = BLOG_POSTS.find(p => p.id === params.id);

    if (!post) {
        return (
            <div className="flex bg-[#f8fafc] min-h-screen">
                <Sidebar role="patient" />
                <main className="flex-1 p-8 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
                    <Button onClick={() => router.push('/patient/blog')}>Back to Blog</Button>
                </main>
            </div>
        );
    }

    const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="patient" />

            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Header Navigation */}
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 font-bold text-sm bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Articles
                    </button>

                    {/* Article Content */}
                    <article className="bg-white rounded-[48px] overflow-hidden shadow-2xl shadow-primary/5 border border-gray-100 mb-12">
                        <div className="h-[400px] relative">
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <span className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                                    {post.category}
                                </span>
                                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                                    {post.title}
                                </h1>
                                <div className="flex items-center gap-8 text-white/90 font-medium text-sm">
                                    <span className="flex items-center gap-2 pr-8 border-r border-white/20">
                                        <User size={16} className="text-primary" /> {post.author}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock size={16} className="text-primary" /> {post.readTime}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="flex flex-col lg:flex-row gap-12">
                                {/* Side Info */}
                                <div className="lg:w-1/4 space-y-8">
                                    <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 italic font-medium text-gray-400 text-sm">
                                        Published on <br />
                                        <span className="text-gray-900 font-bold block mt-1 not-italic">{post.date}</span>
                                    </div>
                                    <div className="flex lg:flex-col gap-4">
                                        <button className="flex-1 p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
                                            <Facebook size={20} />
                                        </button>
                                        <button className="flex-1 p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:text-blue-400 hover:border-blue-100 transition-all shadow-sm">
                                            <Twitter size={20} />
                                        </button>
                                        <button className="flex-1 p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:text-primary hover:border-primary/20 transition-all shadow-sm">
                                            <LinkIcon size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Main Text */}
                                <div className="lg:w-3/4">
                                    <p className="text-xl text-gray-600 leading-relaxed mb-8 italic border-l-4 border-primary pl-8 py-2">
                                        {post.content}
                                    </p>
                                    
                                    <div className="prose prose-lg prose-primary max-w-none text-gray-700 space-y-6 text-lg leading-loose">
                                        <p>
                                            In today's fast-paced world, maintaining our health has become more critical than ever. Whether we are focusing on physical fitness, mental well-being, or nutritional balance, the key lies in consistency and small, measurable steps.
                                        </p>
                                        <h3 className="text-2xl font-bold text-gray-900 pt-4">Actionable Insights</h3>
                                        <p>
                                            Research shows that individuals who implement sustainable lifestyle changes are 70% more likely to maintain their long-term health goals. This specifically includes focusing on quality sleep, mindful eating, and regular physical activity.
                                        </p>
                                        <ul className="space-y-3 list-disc pl-6 marker:text-primary">
                                            <li>Start your day with a glass of warm water to boost metabolism.</li>
                                            <li>Dedicate at least 10 minutes to deep breathing exercises.</li>
                                            <li>Swap processed snacks for whole fruits or nuts.</li>
                                            <li>Limit screen time at least 30 minutes before bed.</li>
                                        </ul>
                                        <p className="pt-4">
                                            Remember, your healthcare journey is unique. While these general tips provide a strong foundation, always consult with your specialist through HealthConnect to tailor a plan that fits your specific medical history and needs.
                                        </p>
                                    </div>

                                    <div className="mt-12 p-8 bg-primary/5 rounded-[32px] border border-primary/10">
                                        <h4 className="text-lg font-bold text-primary mb-2 italic">About the Author</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {post.author} is a board-certified specialist with over 15 years of experience in clinical practice. They are passionate about preventive medicine and patient education.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Related Articles */}
                    {relatedPosts.length > 0 && (
                        <div className="mb-20">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 font-heading">Related Articles</h3>
                                <Link href="/patient/blog" className="text-primary font-bold text-sm hover:underline flex items-center gap-1 italic">
                                    View All <ChevronRight size={16} />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedPosts.map((rp) => (
                                    <Link key={rp.id} href={`/patient/blog/${rp.id}`} className="bg-white p-4 rounded-[32px] border border-gray-100 flex gap-4 premium-shadow group transition-all hover:border-primary/20">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                                            <img src={rp.image} alt={rp.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className="text-[10px] font-bold text-primary uppercase mb-1">{rp.category}</span>
                                            <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                                {rp.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
