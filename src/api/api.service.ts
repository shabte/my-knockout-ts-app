const BASE_URL = 'http://localhost:8080/api';

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.statusText}`);
    return response.json() as Promise<T>;
}
