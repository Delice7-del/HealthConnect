'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isLoading?: boolean;
}

export default function Button({
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-light shadow-xl shadow-primary/20 active:scale-95 font-bold italic",
        secondary: "bg-secondary text-white hover:opacity-90 shadow-xl shadow-secondary/20 active:scale-95 font-bold italic",
        outline: "border-2 border-primary/20 text-primary hover:bg-primary hover:text-white active:scale-95 font-bold italic",
        ghost: "text-primary/60 hover:bg-primary/5 hover:text-primary font-bold italic",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-xl shadow-red-500/20 active:scale-95 font-bold italic",
    };

    const sizes = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
        xl: "px-10 py-4.5 text-xl",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {children}
        </button>
    );
}
