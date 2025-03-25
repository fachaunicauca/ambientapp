export interface LoginResponse {
    action: 'login';
    success: boolean;
    data?: {
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    };
    error?: string;
    field?: 'email' | 'password' | 'root';
}

export interface ErrorResponse {
    detail?: string;
    message?: string;
    error?: string;
}