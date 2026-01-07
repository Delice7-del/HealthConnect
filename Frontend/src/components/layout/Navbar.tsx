'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/20 px-4 md:px-8 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold gradient-text">
                    HealthConnect
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-600 hover:text-primary transition-colors font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link
                                href={`/${user.role}/dashboard`}
                                className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/90 transition-all font-semibold flex items-center"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={logout}
                                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="text-gray-600 hover:text-primary transition-colors font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/90 transition-all font-semibold shadow-lg shadow-primary/25"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-gray-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-4 space-y-4 animate-in slide-in-from-top duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="block text-gray-600 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {user ? (
                        <Link
                            href={`/${user.role}/dashboard`}
                            className="block bg-primary text-white px-5 py-2 rounded-lg text-center font-semibold"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <div className="space-y-4 pt-2">
                            <Link
                                href="/login"
                                className="block text-center text-gray-600 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="block bg-primary text-white px-5 py-2 rounded-lg text-center font-semibold"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
