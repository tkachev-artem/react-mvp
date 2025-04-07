"use client";

import { useState } from 'react';
import Image from 'next/image';
import card from '@/hooks/carddata';


const CardContainer = () => { //базовый контейнер отображения карты
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
                    <p className='text-black text-2xl font-semibold'>{card.cardnumber}</p>
                </div>
            </div>
        </div>
    )
}

const Card = () => { //проверка на наличие в бд карты
    const [hasCard] = useState<boolean>(card.cardnumber !== "");

    if (!hasCard) {
        return (
            <div>
                <p>Нет карты</p>
            </div>
        )
    }
    
    return ( //отображение карты
        <CardContainer />
    )
}

export default Card;