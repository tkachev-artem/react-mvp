import { useQuery } from '@tanstack/react-query';

// Интерфейс для данных карты
export interface CardData {
    cardNumber?: string;     // Номер карты
}

// Функция для форматирования номера карты (добавление пробелов после каждых 4 цифр)
export const formatCardNumber = (cardNumber: string): string => {
    // Удаляем все нецифровые символы
    const cleanedNumber = cardNumber.replace(/\D/g, '');
    
    // Добавляем пробелы после каждых 4 цифр
    const formattedNumber = cleanedNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formattedNumber;
};

// Функция для получения данных карты через API
const fetchCardInfo = async (): Promise<CardData> => {
    // Получаем токен из localStorage
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
        throw new Error('Не авторизован');
    }
    
    // Запрос к нашему API роуту
    const response = await fetch('/api/VCard/info', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Ошибка при получении данных карты');
    }
    
    const data = await response.json();
    
    // Форматируем номер карты перед возвращением данных
    if (data.cardNumber) {
        data.cardNumber = formatCardNumber(data.cardNumber);
    }
    
    return data;
};

// Хук для получения данных карты с использованием TanStack Query
export const useCardData = () => {
    return useQuery({
        queryKey: ['cardInfo'],
        queryFn: fetchCardInfo,
        // Если нет карты, возвращаем объект с пустыми значениями
        initialData: { cardNumber: '' },
        // Отключаем автоматический запрос при монтировании, если нет токена
        enabled: !!localStorage.getItem('auth_token'),
        // Обновляем данные каждые 5 минут
        refetchInterval: 5 * 60 * 1000,
        // Не обновляем если вкладка не активна
        refetchOnWindowFocus: true,
        // Если ошибка, пытаемся еще 3 раза
        retry: 3,
    });
};

// Фейковые данные карты для начального состояния или тестирования
export const defaultCardData: CardData = {
    cardNumber: "1234 5678 9012 3456"
};