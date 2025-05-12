"use client";

import { useQuery } from "@tanstack/react-query";

// Проверка, доступен ли localStorage (только в браузере)
const isClient = typeof window !== 'undefined';

// Безопасный доступ к localStorage
const getAuthToken = (): string | null => {
  if (!isClient) return null;
  return localStorage.getItem("auth_token");
};

// Интерфейс для данных карты (взято из Swagger)
export interface CardData {
  id?: number;
  cardNumber?: string;
  expiryDate?: string;
  fullName?: string;
  status?: string;
  isActive?: boolean;
}

// Фейковые данные карты при ошибке/отключенном сервере
export const defaultCardData: CardData = {
  id: 1,
  cardNumber: "1234 5678 9012 3425",
  expiryDate: "12/26",
  fullName: "Иван Иванов",
  status: "Active",
  isActive: true,
};

// Форматирование номера карты — добавляет пробелы после каждых 4 цифр
export const formatCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\D/g, "");
  return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
};

// 📤 Запрос на создание виртуальной карты
export const requestVirtualCard = async (): Promise<void> => {
  const token = getAuthToken();
  if (!token) throw new Error("Не авторизован");

  const response = await fetch("/api/VCard/request", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 401) throw new Error("Необходима авторизация");
    if (response.status === 400) throw new Error(errorData.message || "Некорректный запрос");
    if (response.status === 409) throw new Error("У вас уже есть виртуальная карта");
    throw new Error(errorData.message || "Ошибка сервера");
  }
};

// ✅ Подтверждение карты по PIN-коду
export const confirmVirtualCard = async (pinCode: string): Promise<void> => {
  const token = getAuthToken();
  if (!token) throw new Error("Не авторизован");

  const response = await fetch("/api/VCard/confirm", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pinCode), // 👈 просто строка!
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 401) throw new Error("Необходима авторизация");
    if (response.status === 400) throw new Error("Неверный PIN-код");
    throw new Error(errorData.message || "Ошибка подтверждения карты");
  }
};

// 📥 Получение данных карты
const fetchCardInfo = async (): Promise<CardData> => {
  const token = getAuthToken();
  if (!token) throw new Error("Не авторизован");

  const response = await fetch("/api/VCard/info", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("Не авторизован");
    if (response.status === 404) return {}; // Нет карты — не ошибка
    throw new Error("Ошибка при получении данных карты");
  }

  const data = await response.json();
  if (data.cardNumber) {
    data.cardNumber = formatCardNumber(data.cardNumber);
  }

  return data;
};

export const useCardData = () => {
    return useQuery({
      queryKey: ["cardInfo"],
      queryFn: fetchCardInfo,
      enabled: isClient && !!getAuthToken(),
      refetchInterval: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      retry: false,
    });
  };
  
