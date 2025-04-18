"use client";

import Image from 'next/image';
import { useCardData, formatCardNumber } from '@/hooks/carddata';

const CardContainer = ({ cardNumber }: { cardNumber: string }) => { //базовый контейнер отображения карты
    return (
        <div className='w-full'>
            <div className='relative w-fit mx-auto'>
                <Image 
                    src={'/images/card.png'} 
                    alt='card' 
                    width={353} 
                    height={206} 
                    className='w-auto h-auto'
                />
                <div className='absolute bottom-5 right-5'>
                    <p className='text-black text-2xl font-semibold'>{cardNumber}</p>
                </div>
            </div>
        </div>
    )
}

const Card = () => { //проверка на наличие в бд карты
    // Используем хук для получения данных карты
    const { data, isLoading, isError, error } = useCardData();
    
    // Если загрузка данных
    if (isLoading) {
        return (
            <div className="flex items-center justify-center">
                <p>Загрузка данных карты...</p>
            </div>
        );
    }
    
    // Если произошла ошибка
    if (isError) {
        return (
            <div className="flex items-center justify-center">
                <p>Не удалось загрузить данные карты: {error instanceof Error ? error.message : 'Неизвестная ошибка'}</p>
            </div>
        );
    }
    
    // Проверяем, есть ли у пользователя карта
    const hasCard = data?.cardNumber && data.cardNumber !== "";

    if (!hasCard) {
        return (
            <div>
                <p>Нет карты</p>
            </div>
        )
    }
    
    // Номер карты должен уже быть отформатирован в хуке useCardData,
    // но на всякий случай применим форматирование здесь тоже
    const formattedCardNumber = data.cardNumber ? formatCardNumber(data.cardNumber) : '';
    
    return ( //отображение карты
        <CardContainer cardNumber={formattedCardNumber} />
    )
}

export default Card;