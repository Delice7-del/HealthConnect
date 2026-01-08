import { apiCall } from '../lib/api';

export const userService = {
    async getUsers() {
        return apiCall('/users');
    },

    async getDoctors() {
        return apiCall('/users/doctors');
    },

    async getProfile() {
        return apiCall('/users/profile');
    },

    async updateProfile(profileData: any) {
        return apiCall('/users/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    },

    async approveDoctor(id: string) {
        return apiCall(`/users/${id}/approve`, {
            method: 'PUT',
        });
    }
};
