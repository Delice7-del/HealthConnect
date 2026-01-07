import { apiCall } from '../lib/api';

export const resourceService = {
    async getResources() {
        return apiCall('/resources');
    },

    async getResourceById(id: string) {
        return apiCall(`/resources/${id}`);
    },

    async createResource(resourceData: any) {
        return apiCall('/resources', {
            method: 'POST',
            body: JSON.stringify(resourceData),
        });
    }
};
