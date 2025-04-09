import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { useState, useEffect } from "react";

interface login {
    email: string;
    password: string;
}

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token');
        if (savedToken) setToken(savedToken);
      }, []);

      const loginMutation = useMutation({
        mutationFn: (credentials: login) => authApi.login(credentials),
        onSuccess: (data) => {
          // Предполагаем, что API возвращает токен в поле token
          const newToken = data.token;
          setToken(newToken);
          localStorage.setItem('auth_token', newToken);
        },
      });

      const logout = () => {
        setToken(null);
        localStorage.removeItem('auth_token');
      };

      return { //почему?
        isLoggedIn: !!token,
        token,
        login: loginMutation.mutate,
        logout,
        isLoading: loginMutation.isPending,
        error: loginMutation.error,
        isError: loginMutation.isError,
      };
}