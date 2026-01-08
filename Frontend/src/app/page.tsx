'use client';

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/layout/Footer";

import { Video, Calendar, Clock, FileText } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] gpu-boost">
      <Navbar />
      <Hero />

      {/* Featured Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Providing a wide range of medical services to ensure your well-being.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service Cards */}
            {[
              { title: "Virtual Consultation", icon: <Video size={32} />, desc: "Consult with experts from the comfort of your home." },
              { title: "Appointment Booking", icon: <Calendar size={32} />, desc: "Easy and quick scheduling with top doctors." },
              { title: "24/7 Support", icon: <Clock size={32} />, desc: "Round the clock medical assistance for emergencies." },
              { title: "Health Records", icon: <FileText size={32} />, desc: "Securely manage all your medical history in one place." }
            ].map((service, i) => (
              <div key={i} className="p-6 border border-gray-100 rounded-3xl hover:border-primary/50 transition-all hover:bg-primary/5 group cursor-pointer">
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform inline-block p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
