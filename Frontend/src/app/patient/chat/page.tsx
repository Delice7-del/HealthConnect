'use client';

import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { apiCall } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Send, Smile, Paperclip, MoreHorizontal, User, Shield, MessageSquare, Users, Calendar, Star, ArrowUpRight, Check, X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ConsultationChat() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Mock conversation partner for now
    const activeChat = {
        name: 'Dr. Sarah Johnson',
        status: 'Online',
        specialization: 'Cardiologist',
        avatar: ''
    };

    useEffect(() => {
        // Scroll to bottom when messages change
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: Date.now(),
            sender: user?.id,
            content: newMessage,
            createdAt: new Date().toISOString(),
        };

        setMessages([...messages, msg]);
        setNewMessage('');

        // Simulate doctor response
        setTimeout(() => {
            const reply = {
                id: Date.now() + 1,
                sender: 'doctor_id',
                content: "I've reviewed your latest reports. Everything looks within range for now. How are you feeling today?",
                createdAt: new Date().toISOString(),
            };
            setMessages(prev => [...prev, reply]);
        }, 1500);
    };

    return (
        <div className="flex bg-[#f8fafc] h-screen overflow-hidden">
            <Sidebar role="patient" />

            <main className="flex-1 flex flex-col">
                {/* Chat Header */}
                <header className="bg-white border-b border-gray-100 p-6 flex justify-between items-center shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold">
                                SJ
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{activeChat.name}</h3>
                            <p className="text-gray-500 text-xs flex items-center gap-1">
                                <Shield size={12} className="text-primary" /> {activeChat.specialization} • {activeChat.status}
                            </p>
                        </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                </header>

                {/* Message Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed"
                >
                    {messages.map((msg) => {
                        const isMe = msg.sender === user?.id;
                        return (
                            <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                                <div className={cn(
                                    "max-w-[70%] p-4 rounded-3xl shadow-sm",
                                    isMe
                                        ? "bg-primary text-white rounded-tr-none"
                                        : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                                )}>
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                    <span className={cn(
                                        "block text-[10px] mt-2 font-medium opacity-60",
                                        isMe ? "text-right" : "text-left"
                                    )}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                            <MessageSquare size={48} className="mb-4 text-primary" />
                            <p className="font-semibold text-gray-800">Your secure consultation has started.</p>
                            <p className="text-sm">Messages are end-to-end encrypted.</p>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white border-t border-gray-100">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <button type="button" className="p-2 text-gray-400 hover:text-primary transition-colors">
                            <Paperclip size={20} />
                        </button>
                        <input
                            type="text"
                            placeholder="Type your message here..."
                            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 py-2"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button type="button" className="p-2 text-gray-400 hover:text-primary transition-colors">
                            <Smile size={20} />
                        </button>
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 shadow-md shadow-primary/25"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
