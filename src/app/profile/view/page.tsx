"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/UseAuth";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";

export default function ProfileView() {
    const router = useRouter();
    const { logout } = useAuth();
    const { user, isLoading, error } = useUser();

    // Добавляем отладочное логирование
    console.log('Profile data:', { user, isLoading, error });

    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    return (
        <div className="px-5 py-6">
            {/* Контейнер шапки */}
            <div className=" flex items-center relative">
                {/* Кнопка выйти */}
                <button
                    onClick={() => logout()}
                    className="w-[27px] h-[27px] flex items-center justify-center"
                >
                    <Image
                        src="/images/backToExit.png"
                        alt="Выйти"
                        width={27}
                        height={27}
                        className="w-full h-full"
                    />
                </button>

                {/* Текст Профиль - абсолютное позиционирование по центру */}
                <span className="absolute left-1/2 -translate-x-1/2 text-[18px] font-semibold">
                    Профиль
                </span>

                {/* Кнопка редактировать */}
                <button
                    onClick={() => router.push('/profile')}
                    className="ml-auto w-[27px] h-[27px] flex items-center justify-center"
                >
                    <Image
                        src="/images/edit-icon.png"
                        alt="Редактировать"
                        width={27}
                        height={27}
                        className="w-full h-full"
                    />
                </button>
            </div>

            {/* Аватар */}
            <div className="flex justify-center mb-6 mt-[16px]">
                <div className="w-[126px] h-[126px] rounded-full overflow-hidden">
                    <Image
                        src="/images/avatar.jpg"
                        alt="Avatar"
                        width={126}
                        height={126}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Блок с именем */}
            <div className="bg-gray-100 rounded-[40px] h-[45px] px-5 flex items-center justify-between mb-[18px]">
                <span className="text-gray-700 text-[18px]">Имя</span>
                <span className="text-gray-500 font-medium text-[18px]">
                    {isLoading ? (
                        "Загрузка..."
                    ) : error ? (
                        "Александр" // заглушка
                    ) : user?.name || "Не указано"}
                </span>
            </div>

            {/* Блок с email и телефоном */}
            <div className="bg-gray-100 rounded-[26px] h-[102px] px-5 py-4 flex flex-col justify-between mb-[8px]">
                {/* Email */}
                <div className="items-start justify-center">
                    <span className="text-gray-700 text-[18px]">
                        {isLoading ? (
                            "Загрузка..."
                        ) : error ? (
                            "alexandrreal@gmail.com" //заглушка
                        ) : user?.email || "Не указано"}
                    </span>
                </div>

                {/* Разделительная линия */}
                <div className="h-px bg-gray-400 w-full" />

                {/* Телефон */}
                <div className="items-start justify-center">
                    <span className="text-gray-700 text-[18px]">+7 918 72 09 38</span>
                </div>
            </div>

            {/* Текст под контактами */}
            <div className="px-[20px] mt-[20px] h-[51px]">
                <span className="text-gray-500 text-[14px] text-justify block leading-3.5">
                    Ваша почта и телефон могут быть использованый для звонков и сообщений от города, а также для восстановления учетной записи
                </span>
            </div>
            
            {/* ТекстФилд "Дата Рождения" */}
            <div className="bg-gray-100 rounded-[40px] h-[45px] px-5 flex items-center justify-between mt-[21px]">
                <span className="text-gray-700 text-[18px]">Дата рождения</span>
                <span className="text-gray-500 font-medium text-[18px]">18.04.1995</span>
            </div>
            
            {/* Текст под "Дата Рождения" */}
            <div className="px-[20px] mt-[16px] h-[51px]">
                <span className="text-gray-500 text-[14px] text-justify block leading-3.5">
                    Мы используем ее для более полноценного общения с городом
                </span>
            </div>

            {/* Уведомления */}
            <div className="bg-gray-100 rounded-[40px] h-[45px] px-5 flex items-center justify-between mb-[30px]">
                <span className="text-gray-700 text-[18px]">Уведомления</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={isNotificationsEnabled}
                        onChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
                    />
                    <div className="w-11 h-6 bg-gray-400 peer-checked:bg-blue-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
            </div>
        </div>
    );
} 