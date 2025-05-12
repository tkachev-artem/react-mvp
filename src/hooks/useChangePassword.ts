"use client";

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '@/hooks/auth-hook';

interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export function useChangePassword() {
    const { token } = useAuth();

    const mutation = useMutation({
        mutationFn: async (data: ChangePasswordData) => {
            try {
                const response = await axios.post('/api/password/change', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Ошибка API:', {
                        status: error.response?.status,
                        data: error.response?.data
                    });
                }
                throw error;
            }
        }
    });

    return mutation;
} 