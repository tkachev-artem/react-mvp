import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

interface UserData {
    name: string;
    email: string;
}

export function useUser() {
    const { token, isLoggedIn } = useAuth();

    const { data: user, isLoading, error } = useQuery<UserData>({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        },
        enabled: isLoggedIn && !!token,
        retry: 1,
        refetchInterval: 5 * 60 * 1000,
    });

    return {
        user,
        isLoading,
        error
    };
} 