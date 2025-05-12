"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode, useState } from "react";
import { useAuth } from "@/hooks/auth-hook";

const Protect = ({children}: {children: ReactNode}) => {
    const router = useRouter();
    const { isLoggedIn, isLoading, token } = useAuth();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        // Проверка авторизации только после завершения загрузки
        if (!isLoading) {
            if (!isLoggedIn) {
                console.log('Пользователь не авторизован, перенаправление на /auth');
                router.replace("/auth"); // Используем replace вместо push для очистки истории
            } else {
                setAuthChecked(true);
            }
        }
    }, [isLoggedIn, isLoading, router, token]);

    // Показываем спиннер загрузки пока проверяем авторизацию
    if (isLoading || (!authChecked && !isLoggedIn)) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
            </div>
        );
    }

    // Рендерим children только если пользователь авторизован и проверка пройдена
    return authChecked ? <>{children}</> : null;
};

export default Protect;
