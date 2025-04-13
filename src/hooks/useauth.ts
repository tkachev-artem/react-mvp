import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { useState, useEffect } from "react";

interface login {
    email: string;
    password: string;
}

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const savedToken = localStorage.getItem('auth_token');
                if (savedToken) setToken(savedToken);
            } catch (error) {
                console.error('Ошибка при инициализации авторизации:', error);
            } finally {
                setIsInitialized(true);
            }
        };
        
        initAuth();
    }, []);

    const loginMutation = useMutation({
        mutationFn: (credentials: login) => authApi.login(credentials),
        onSuccess: (data) => {
            const newToken = data.token;
            setToken(newToken);
            localStorage.setItem('auth_token', newToken);
        },
    });

    const logout = () => {
        setToken(null);
        localStorage.removeItem('auth_token');
    };

    return {
        isLoggedIn: !!token,
        token,
        login: loginMutation.mutate,
        logout,
        isLoading: !isInitialized || loginMutation.isPending,
        error: loginMutation.error,
        isError: loginMutation.isError,
    };
}