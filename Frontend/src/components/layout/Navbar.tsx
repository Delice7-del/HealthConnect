'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/about' },
    { name: 'Contact us', href: '/contact' },
    { name: 'Services', href: '/services' },
];

const lightPages = ['/contact', '/privacy', '/terms'];

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isLightMode = isScrolled || lightPages.includes(pathname);

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 px-4 md:px-12 transition-all duration-500",
            isScrolled ? "py-4" : "py-6"
        )}>
            <div className={cn(
                "max-w-7xl mx-auto flex justify-between items-center rounded-full px-8 py-3 transition-all duration-500 border",
                isLightMode 
                    ? "bg-white/80 backdrop-blur-xl border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.05)]" 
                    : "bg-white/10 backdrop-blur-md border-white/10"
            )}>
                <Link href="/" className={cn(
                    "text-2xl font-bold font-heading tracking-tight flex items-center transition-colors duration-500",
                    isLightMode ? "text-primary" : "text-white"
                )}>
                    HealthConnect<span className={cn(
                        "ml-0.5 mt-1 block",
                        isLightMode ? "text-primary" : "text-white"
                    )}>.</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm transition-all duration-300 relative group",
                                pathname === link.href 
                                    ? (isLightMode ? "text-primary font-bold" : "text-white font-bold")
                                    : (isLightMode ? "text-primary/60 hover:text-primary" : "text-white/80 hover:text-white")
                            )}
                        >
                            {link.name}
                            {pathname === link.href && (
                                <span className={cn(
                                    "absolute -bottom-1 left-0 w-full h-0.5 rounded-full transition-colors duration-500",
                                    isLightMode ? "bg-primary" : "bg-white"
                                )} />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link
                                href={`/${user.role}/dashboard`}
                                className={cn(
                                    "px-6 py-2.5 rounded-full transition-all font-bold text-sm shadow-sm",
                                    isLightMode 
                                        ? "bg-primary text-white hover:bg-primary-light" 
                                        : "bg-white text-primary hover:bg-white/90"
                                )}
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={logout}
                                className={cn(
                                    "p-2 transition-colors",
                                    isLightMode ? "text-primary hover:text-red-500" : "text-white hover:text-red-300"
                                )}
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/register"
                            className={cn(
                                "px-7 py-2.5 rounded-full transition-all font-bold text-sm shadow-sm",
                                isLightMode 
                                    ? "bg-primary text-white hover:bg-primary-light" 
                                    : "bg-white text-primary hover:bg-white/90"
                            )}
                        >
                            Book Appointment
                        </Link>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className={cn(
                        "md:hidden transition-colors duration-500",
                        isLightMode ? "text-primary" : "text-white"
                    )}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={cn(
                    "md:hidden absolute top-full left-4 right-4 mt-4 backdrop-blur-xl border rounded-[2.5rem] p-8 space-y-4 animate-in slide-in-from-top-4 duration-500 shadow-2xl",
                    isLightMode 
                        ? "bg-white/95 border-gray-100 shadow-xl" 
                        : "bg-primary-light/95 border-white/10"
                )}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "block text-lg font-medium transition-colors",
                                pathname === link.href 
                                    ? (isLightMode ? "text-primary font-bold" : "text-white font-bold")
                                    : (isLightMode ? "text-primary/60" : "text-white/70")
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className={cn(
                        "pt-6 border-t",
                        isLightMode ? "border-gray-100" : "border-white/10"
                    )}>
                        {user ? (
                            <Link
                                href={`/${user.role}/dashboard`}
                                className={cn(
                                    "block px-5 py-4 rounded-2xl text-center font-bold transition-all",
                                    isLightMode 
                                        ? "bg-primary text-white" 
                                        : "bg-white text-primary"
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/register"
                                className={cn(
                                    "block px-5 py-4 rounded-2xl text-center font-bold transition-all",
                                    isLightMode 
                                        ? "bg-primary text-white" 
                                        : "bg-white text-primary"
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Book Appointment
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

