"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCardData } from '@/hooks/carddata';
import { useEffect, useState } from 'react';

const CardContainer = ({ cardNumber, isLoading }: { cardNumber: string; isLoading?: boolean }) => { //базовый контейнер отображения карты
    // Используем состояние для плавного перехода
    const [showContent, setShowContent] = useState(false);
    
    // После монтирования компонента показываем содержимое
    useEffect(() => {
        setShowContent(true);
    }, []);

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
                <div className='absolute bottom-5 right-5 min-h-[30px] min-w-[150px] flex justify-end'>
                    {showContent && !isLoading && (
                        <p className='text-black text-2xl font-semibold'>{cardNumber}</p>
                    )}
                    {isLoading && (
                        <div className="bg-gray-200 animate-pulse rounded-md h-8 w-36"></div>
                    )}
                </div>
            </div>
        </div>
    )
}

const Card = () => { //проверка на наличие в бд карты
    // Используем хук для получения данных карты
    const { data, isLoading, isError } = useCardData();
    // Клиентский рендеринг
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    // Если страница ещё не гидрирована на клиенте, показываем заглушку карты
    if (!isClient) {
        return <CardContainer cardNumber="" isLoading={true} />;
    }
    
    // Если загрузка данных, показываем заглушку
    if (isLoading) {
        return <CardContainer cardNumber="" isLoading={true} />;
    }
    
    // Если произошла ошибка
    if (isError) {
        return (
            <div className="flex flex-col gap-2.5 items-center">
                <p className='text-black text-base font-normal'>В данный момент виртуальная карта горожанина отсутствует, получить информацию можно нажав на кнопку ниже:</p>
                <button className="text-black text-base font-semibold px-4 py-2 rounded-xl border-2 border-black">
                    <Link href="/card">
                        Открыть карту
                    </Link>
                </button>
            </div>
        );
    }
    
    // Проверяем, есть ли у пользователя карта
    const hasCard = data?.cardNumber && data.cardNumber !== "";

    if (!hasCard) {
        return (
            <div className="flex flex-col gap-2.5 items-center">
                <p className='text-black text-base font-normal'>В данный момент виртуальная карта горожанина отсутствует, получить информацию можно нажав на кнопку ниже:</p>
                <button className="text-black text-base font-semibold px-4 py-2 rounded-xl border-2 border-black">
                    <Link href="/card">
                        Открыть карту
                    </Link>
                </button>
            </div>
        )
    }
    
    // Используем уже отформатированный номер карты из хука
    const formattedCardNumber = data.cardNumber || '';
    
    return ( //отображение карты
        <CardContainer cardNumber={formattedCardNumber} />
    )
}

export default Card;