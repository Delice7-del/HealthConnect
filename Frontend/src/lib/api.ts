const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

export async function apiCall(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = new Headers({
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    });

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const body = await response.text();
            console.error('Non-JSON response received:', body.substring(0, 200));
            throw new Error(`Server returned an unexpected response (Status: ${response.status}). Please ensure the backend is running correctly.`);
        }

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                // If we get an auth error, it might be due to an invalid/expired token.
                // We can either clear it here or let the UI handle it. 
                // For "jwt malformed", typically we should clear the token.
                if (typeof window !== 'undefined') {
                    // Optionally clear token to force re-login on next load
                    // localStorage.removeItem('token'); 
                    // window.location.href = '/login'; 
                }
            }
            throw new Error(data.message || 'API call failed');
        }

        return data;
    } catch (error: any) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Unable to connect to the server. Please check if the backend is running and reachable.');
        }
        throw error;
    }
}
