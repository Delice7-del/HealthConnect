import { apiCall } from '../lib/api';

export const appointmentService = {
    async getAppointments() {
        return apiCall('/appointments');
    },

    async bookAppointment(appointmentData: any) {
        return apiCall('/appointments/book', {
            method: 'POST',
            body: JSON.stringify(appointmentData),
        });
    },

    async updateStatus(id: string, status: string) {
        return apiCall(`/appointments/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    }
};
