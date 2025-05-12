"use client";

import { useAuth } from "@/hooks/UseAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
};

export default function Profile() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/User/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfileData(response.data);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке профиля:', err);
        setError('Не удалось загрузить данные профиля');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
      setError('Для просмотра профиля необходимо авторизоваться');
    }
  }, [token, router]);

  const handleLoginRedirect = () => {
    router.push('/auth');
  };

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
          Профиль
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4 px-5">
          {error}
          <button 
            onClick={handleLoginRedirect} 
            className="mt-4 bg-cyan-700 text-white px-4 py-2 rounded-xl block w-full"
          >
            Войти в аккаунт
          </button>
        </div>
      ) : profileData && (
        <>
          {/* Аватар профиля */}
          <div className="flex justify-center mb-6">
            <div className="w-[126px] h-[126px] rounded-full overflow-hidden">
              {profileData.avatar ? (
                <Image 
                  src={profileData.avatar} 
                  alt="Аватар профиля" 
                  width={126} 
                  height={126} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-gray-600">
                    {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Данные профиля */}
          <div className="space-y-4">
            {/* Имя */}
            <div className="bg-neutral-100 rounded-xl h-[45px] px-5 flex items-center justify-between">
              <span className="text-gray-700 text-[18px]">Имя</span>
              <span className="text-black font-medium text-[18px]">{profileData.firstName}</span>
            </div>

            {/* Фамилия */}
            <div className="bg-neutral-100 rounded-xl h-[45px] px-5 flex items-center justify-between">
              <span className="text-gray-700 text-[18px]">Фамилия</span>
              <span className="text-black font-medium text-[18px]">{profileData.lastName}</span>
            </div>

            {/* Email */}
            <div className="bg-neutral-100 rounded-xl h-[45px] px-5 flex items-center justify-between">
              <span className="text-gray-700 text-[18px]">Email</span>
              <span className="text-black font-medium text-[18px]">{profileData.email}</span>
            </div>

            {/* Кнопка "Изменить пароль" */}
            <div className="w-full">
              <button 
                onClick={() => router.push('/profile/change-password')}
                className="w-full mt-4 bg-neutral-100 text-center text-cyan-700 rounded-xl h-[45px] px-5 flex items-center justify-center hover:bg-cyan-700 hover:text-white"
              >
                Изменить пароль
              </button>
            </div>

            <div>
              <button className="w-full h-[45px] bg-red-200 text-black text-base px-4 py-2 rounded-xl hover:bg-red-400" onClick={() => {
                logout();
              }}>Выйти</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

