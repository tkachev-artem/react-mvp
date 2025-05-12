"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileHeader() {
    const router = useRouter();

    return (
        <div className="px-[20px] flex items-center justify-between relative">
            {/* Кнопка выхода */}
            <div className="flex items-center">
                <button
                    onClick={() => router.back()}
                    className="w-[27px] h-[27px] flex items-center justify-center"
                >
                    <img
                        src="/images/backToExit.png"
                        alt="Назад"
                        className="w-full h-full"
                    />
                </button>

                {/* Отступ */}
                <div className="w-[37px]" />

                {/* Заголовок */}
                <span className="text-[18px] font-semibold">
                    Профиль
                </span>
            </div>

            {/* Кнопка редактирования */}
            <button
                onClick={() => router.push('/profile')}
                className="w-[27px] h-[27px] flex items-center justify-center"
            >
                <img
                    src="/images/edit-icon.png"
                    alt="Редактировать"
                    className="w-full h-full"
                />
            </button>
        </div>
    );
} 