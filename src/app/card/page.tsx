"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "@/components/card";
import { PinCodeModal } from "@/components/PinCodeModal";

import Image from "next/image";

import {
  useCardData,
  requestVirtualCard,
  confirmVirtualCard,
} from "@/hooks/carddata";

export default function CardPage() {
  const router = useRouter();
  const { data: card, isLoading, error, refetch } = useCardData();
  const [showPinModal, setShowPinModal] = useState(false);
  const [isRequestingCard, setIsRequestingCard] = useState(false);
  const [isServerDown, setIsServerDown] = useState(false);
  // Состояние для управления клиентским рендерингом
  const [isClient, setIsClient] = useState(false);

  // Эффект для избежания проблем гидратации
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCreateCard = async () => {
    try {
      setIsRequestingCard(true);
      await requestVirtualCard();
      setShowPinModal(true);
    } catch (error) {
      console.error("Ошибка при создании карты:", error);
      if (error instanceof Error) {
        if (error.message === "Необходима авторизация") {
          router.push("/login");
          return;
        }
        if (error.message === "Failed to fetch") {
          setIsServerDown(true);
          return;
        }
        alert(error.message);
      }
    } finally {
      setIsRequestingCard(false);
    }
  };

  const handlePinSubmit = async (pinCode: string) => {
    try {
      await confirmVirtualCard(pinCode);
      setShowPinModal(false);
      await refetch();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Необходима авторизация") {
          router.push("/login");
          return;
        }
        if (error.message === "Failed to fetch") {
          setIsServerDown(true);
          setShowPinModal(false);
          return;
        }
      }
      throw error;
    }
  };

  // Проверка: есть ли карта
  const hasCard = !!card?.cardNumber;

  // Условие для кнопки "Создать карту"
  const shouldShowCreateButton = !isLoading && !hasCard && !isServerDown;

  useEffect(() => {
    if (error) {
      console.warn("Ошибка загрузки карты:", error);
    }
  }, [error]);

  // Показываем заглушку до полной гидратации на клиенте
  if (!isClient) {
    return (
      <div className="p-5">
        <div className="flex items-center relative">
          <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full">
            <Image src="/icons/appnavigation/left-arrow.svg" alt="left-arrow" width={10} height={10} />
          </div>
          <div className="w-[27px] h-[27px] flex items-center justify-center"></div>
          <span className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
            Карта
          </span>
        </div>
        <div className="mt-5">
          <div className="w-full h-[200px] flex items-center justify-center bg-gray-100 rounded-[20px]">
            <span className="text-gray-600">Загрузка...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Заголовок и кнопка назад */}
      <div className="flex items-center relative">
        <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full" role="button" onClick={() => router.back()}> {/* кнопка назад */}
          <Image src="/icons/appnavigation/left-arrow.svg" alt="left-arrow" width={10} height={10} />
         </div>

        <div className="w-[27px] h-[27px] flex items-center justify-center">
          
        </div>

        <span className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
          Карта
        </span>
      </div>

      {/* Контент */}
      <div className="mt-5">
        {isLoading ? (
          <div className="w-full h-[200px] flex items-center justify-center bg-gray-100 rounded-[20px]">
            <span className="text-gray-600">Загрузка...</span>
          </div>
        ) : hasCard || isServerDown ? (
          <Card />
        ) : shouldShowCreateButton ? (
          <button
            onClick={handleCreateCard}
            disabled={isRequestingCard}
            className="w-full h-[60px] border-2 border-dashed border-cyan-400 rounded-xl text-black font-semibold text-base disabled:bg-gray-50 disabled:text-gray-400"
          >
            {isRequestingCard ? "Создание..." : "Создать виртуальную карту"}
          </button>
        ) : (
          <span className="text-center text-gray-400 block mt-4">
            Не удалось загрузить данные карты
          </span>
        )}
      </div>

      {/* Кнопки с изображениями под картой */}
      <div className="mt-5 flex gap-2.5 justify-between">
        <div role="button" className="w-full h-full p-2.5 flex flex-col gap-2.5 items-center justify-center bg-gray-50 rounded-lg">
          <Image src="/images/card/plus.circle.fill.svg" alt="Пополнить" width={32} height={32} className="w-[32px] h-[32px]" />
          <span className="text-xs font-semibold">Пополнить</span>
        </div>
        <div role="button" className="w-full h-full p-2.5 flex flex-col gap-2.5 items-center justify-center bg-gray-50 rounded-lg">
          <Image src="/images/card/arrow.forward.circle.fill.svg" alt="Вывести" width={32} height={32} className="w-[32px] h-[32px]" />
          <span className="text-xs font-semibold">Вывести</span>
        </div>
      </div>

      {/* Заголовок "История операций" */}
      <h2 className="mt-5 text-xl font-semibold text-left">
        История операций
      </h2>

      {/* Элемент операции */}
      <div className="w-full h-16 bg-gray-50 flex items-centre justify-between px-4 rounded-md mt-5">
        {/* Левая часть: иконка + текст */}
        <div className="flex items-center">

          <Image src="/images/card/iconbuy.png" alt="иконка покупки" width={40} height={40} />

          <span className="ml-[15px] text-[16px] font-bold">Покупка билета на выставку</span>
        </div>


        {/* Правая часть: сумма */}
        <div className="flex items-center">
          <span className="text-[16px] font-bold text-amber-600 mr-[4px]">-500</span>
          <div className="flex justify-center items-center gap-1">
            <Image src="/icons/wallet/bonus.svg" alt="bonus" width={16} height={19} />
          </div>
        </div>
      </div>
      {/* Модальное окно ввода PIN-кода */}
      {showPinModal && (
        <PinCodeModal
          onSubmit={handlePinSubmit}
          onClose={() => setShowPinModal(false)}
        />
      )}
    </div>
  );
}
