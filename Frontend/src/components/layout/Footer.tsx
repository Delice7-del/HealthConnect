import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4 col-span-1 md:col-span-1">
                        <h4 className="text-2xl font-bold gradient-text">HealthConnect</h4>
                        <p className="text-gray-500 leading-relaxed">
                            Your trusted partner for modern healthcare connections and medical resources.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-gray-50 rounded-full text-primary hover:bg-primary hover:text-white transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 bg-gray-50 rounded-full text-blue-400 hover:bg-blue-400 hover:text-white transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="p-2 bg-gray-50 rounded-full text-pink-500 hover:bg-pink-500 hover:text-white transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="p-2 bg-gray-50 rounded-full text-blue-700 hover:bg-blue-700 hover:text-white transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h5 className="font-bold text-gray-800 mb-6">Services</h5>
                        <ul className="space-y-4 text-gray-500">
                            <li><Link href="/register" className="hover:text-primary transition-colors">Find Doctors</Link></li>
                            <li><Link href="/patient/blog" className="hover:text-primary transition-colors">Health Resources</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Emergency Care</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors">Lab Services</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-gray-800 mb-6">Company</h5>
                        <ul className="space-y-4 text-gray-500">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-gray-800 mb-6">Quick Contact</h5>
                        <ul className="space-y-4 text-gray-500">
                            <li>support@healthconnect.com</li>
                            <li>+1 (555) 123-4567</li>
                            <li>123 Health Ave, Medical City</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400 text-sm">
                    <p>© 2024 HealthConnect. All rights reserved.</p>
                    <p className="flex items-center">
                        Made with <Heart size={14} className="mx-1 text-red-500 fill-red-500" /> for a healthier world.
                    </p>
                </div>
            </div>
        </footer>
    );
}
