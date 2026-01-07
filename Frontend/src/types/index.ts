export type UserRole = 'patient' | 'doctor' | 'admin';
export type UserStatus = 'pending' | 'approved' | 'suspended' | 'active';

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    status: UserStatus;
    avatar?: string;
    doctorDetails?: {
        specialization: string;
        licenseNumber: string;
        experience: number;
        bio: string;
        consultationFee: number;
        hospital: string;
        availability: {
            day: string;
            slots: string[];
        }[];
    };
}

export interface Appointment {
    id: string;
    patient: User | string;
    doctor: User | string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'canceled' | 'completed';
    reason: string;
    notes?: string;
}

export interface Message {
    id: string;
    sender: string;
    receiver: string;
    content: string;
    createdAt: string;
}
