import { apiCall } from '../lib/api';

export const authService = {
    async login(credentials: any) {
        return apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    async register(userData: any) {
        return apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },

    async getMe() {
        return apiCall('/auth/me');
    },

    async logout() {
        localStorage.removeItem('token');
    }
};
