import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Интерфейсы для авторизации
interface login {
    email: string;
    password: string;
}

// Интерфейсы для регистрации
interface RegisterStep1 {
    email: string;
    firstName: string;
    lastName: string;
}

interface RegisterStep2 {
    email: string;
    firstName: string;
    lastName: string;
    verificationCode: string;
}

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const router = useRouter();

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

    // Мутация для первого шага регистрации
    const registerStep1Mutation = useMutation({
        mutationFn: async (data: RegisterStep1) => {
            const response = await fetch('/api/register-step1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Ошибка регистрации');
            }
            
            return response.json();
        }
    });

    // Мутация для второго шага регистрации
    const registerStep2Mutation = useMutation({
        mutationFn: async (data: RegisterStep2) => {
            const response = await fetch('/api/register-step2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Ошибка подтверждения');
            }
            
            return response.json();
        },
        onSuccess: (data) => {
            if (data.token) {
                setToken(data.token); //сохраняем токена 
                localStorage.setItem('auth_token', data.token); 
            }
        }
    });

    const logout = () => {
        setToken(null);
        localStorage.removeItem('auth_token');
        router.push('/start');
    };

    return {
        isLoggedIn: !!token,
        token,
        login: loginMutation.mutate,
        registerStep1: registerStep1Mutation.mutate,
        registerStep2: registerStep2Mutation.mutate,
        logout,
        isLoading: !isInitialized || loginMutation.isPending || registerStep1Mutation.isPending || registerStep2Mutation.isPending,
        error: loginMutation.error || registerStep1Mutation.error || registerStep2Mutation.error,
        isError: loginMutation.isError || registerStep1Mutation.isError || registerStep2Mutation.isError,
    };
}