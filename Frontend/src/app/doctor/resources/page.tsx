'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { apiCall } from '@/lib/api';
import { FileText, Plus, Search, Edit3, Trash2, Eye } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

export default function DoctorResources() {
    const [resources, setResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const data = await apiCall('/resources');
            // Filter to only show resources by this doctor if needed, or all for now
            setResources(data.data.resources);
        } catch (err) {
            console.error('Failed to fetch resources', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="doctor" />

            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Health Articles</h1>
                        <p className="text-gray-500 mt-1">Write and manage your educational content for patients.</p>
                    </div>
                    <Button>
                        <Plus size={20} className="mr-2" /> Publish New Article
                    </Button>
                </header>

                <div className="bg-white rounded-3xl premium-shadow border border-gray-100">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-gray-800">Your Publications</h3>
                        <div className="relative w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search my articles..."
                                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-100 rounded-2xl outline-none"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50/20">
                                    <th className="px-6 py-4">Article</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Reads</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-gray-400">Loading resources...</td>
                                    </tr>
                                ) : resources.length > 0 ? resources.map((res) => (
                                    <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800 line-clamp-1">{res.title}</p>
                                                    <p className="text-[10px] text-gray-400">Published {new Date(res.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500 capitalize">{res.category}</td>
                                        <td className="px-6 py-4 text-xs font-bold text-gray-600">
                                            {(Math.random() * 500 + 50).toFixed(0)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                Published
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-gray-400 hover:text-primary transition-all rounded-lg hover:bg-primary/5">
                                                    <Edit3 size={16} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-all rounded-lg hover:bg-gray-100">
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-gray-400 italic">No articles published yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
