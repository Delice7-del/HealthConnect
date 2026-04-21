'use client';

import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Hero";
import AppointmentBar from "@/components/AppointmentBar";
import DoctorsSection from "@/components/DoctorsSection";
import CategorizedServices from "@/components/CategorizedServices";
import Footer from "@/components/layout/Footer";
import BookAppointmentModal from "@/components/BookAppointmentModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(undefined);

  const handleBook = (doctorId?: string) => {
    setSelectedDoctorId(doctorId);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero onBook={() => handleBook()} />
      
      {/* Structural Order from Screenshot */}
      <div className="relative">
        <DoctorsSection />
        <AppointmentBar onBook={(id) => handleBook(id)} />
      </div>

      <CategorizedServices />

      <Footer />

      <BookAppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // You could add a toast here
          console.log("Appointment booked successfully!");
        }}
        preSelectedDoctorId={selectedDoctorId}
      />
    </main>
  );
}
