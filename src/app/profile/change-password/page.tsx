"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useChangePassword } from "@/hooks/useChangePassword";
import { AxiosError } from "axios";
import Image from "next/image";

interface ErrorResponse {
  message?: string;
}

export default function ChangePassword() {
    const router = useRouter();
    const changePassword = useChangePassword();
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');
    // Состояние для управления клиентским рендерингом
    const [isClient, setIsClient] = useState(false);

    // Эффект для избежания проблем гидратации
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('Новые пароли не совпадают');
            return;
        }

        try {
            await changePassword.mutateAsync(passwordData);
            // После успешного изменения пароля очищаем форму
            setPasswordData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            // Показываем уведомление об успехе
            alert('Пароль успешно изменен');
            // Возвращаемся на страницу редактирования профиля
            router.back();
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            setPasswordError(axiosError.response?.data?.message || 'Ошибка при изменении пароля');
        }
    };

    // Показываем фиктивный контент до тех пор, пока компонент не будет полностью гидрирован на клиенте
    if (!isClient) {
        return <div className="px-5 py-6">Загрузка...</div>;
    }

    return (
        <div>
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-6">
                {/* Кнопка возврата */}
                <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full" role="button" onClick={() => router.back()}>
                    <Image src="/icons/appnavigation/left-arrow.svg" alt="left-arrow" width={10} height={10} />
                </div>

                {/* Заголовок */}
                <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
                    Изменение пароля
                </h1>
            </div>

            {/* Форма изменения пароля */}
            <form onSubmit={handlePasswordChange} className="space-y-4 px-5">
                <div>
                    <input
                        type="password"
                        placeholder="Текущий пароль"
                        value={passwordData.oldPassword}
                        onChange={(e) => setPasswordData({
                            ...passwordData,
                            oldPassword: e.target.value
                        })}
                        className="w-full p-2 bg-neutral-100 rounded-xl px-4 h-[45px] outline-none"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Новый пароль"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value
                        })}
                        className="w-full p-2 bg-neutral-100 rounded-xl px-4 h-[45px] outline-none"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Подтвердите новый пароль"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value
                        })}
                        className="w-full p-2 bg-neutral-100 rounded-xl px-4 h-[45px] outline-none"
                    />
                </div>
                {passwordError && (
                    <div className="text-red-500 text-sm px-4">{passwordError}</div>
                )}
                <button
                    type="submit"
                    disabled={changePassword.isPending}
                    className="w-full h-[45px] bg-cyan-700 rounded-xl text-white font-medium"
                >
                    {changePassword.isPending ? "Сохранение..." : "Сохранить"}
                </button>
            </form>
        </div>
    );
} 