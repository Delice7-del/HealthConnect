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
        return apiCall(`/users/${id}/approve`, { method: 'PUT' });
    },

    async getSettings() {
        return apiCall('/users/settings');
    },

    async updateNotifications(data: Record<string, boolean>) {
        return apiCall('/users/settings/notifications', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    async updatePrivacy(data: Record<string, boolean | string>) {
        return apiCall('/users/settings/privacy', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    async updateSecuritySettings(data: Record<string, boolean>) {
        return apiCall('/users/settings/security', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    async changePassword(currentPassword: string, newPassword: string) {
        return apiCall('/users/settings/change-password', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword }),
        });
    },
};
