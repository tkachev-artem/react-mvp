"use client";

import { useState } from "react";
import Image from "next/image";
import tickets from "@/hooks/ticketdata";

interface TicketProps {
    id: number;
    title: string;
    date: string;
    time: string;
    image: string;
}

const TicketContainer = ({ title, date, time, image }: TicketProps) => { //базовый контейнер отображения билета
    return (
        <div className="flex w-full flex-col">
            <div className="w-full h-full aspect-[171/92] rounded-xl relative"> {/* Картинка билета */}
                <Image src={image} alt={title} fill className="object-cover rounded-xl" />
            </div>

            <div className="flex flex-col items-center gap-2.5 self-stretch bg-neutral-100 p-4 rounded-xl border-2 border-solid border-black"> {/* Информация о билете */}
                <div className="flex flex-col justify-center items-center gap-2.5 self-stretch">
                    <h1 className="text-black text-center text-2xl font-semibold">{title}</h1>
                </div>

                <div className="flex justify-center items-center self-stretch">

                    <div className="flex h-10 justify-center items-center gap-1"> {/* Дата и время */}
                        <p className="text-black text-base font-medium">{date}</p>
                        <p className="text-black text-base font-medium">{time}</p>
                    </div>

                </div>            
            </div>
        </div>
    );
}

const Ticket = () => { //проверка на наличие в бд билетов
    const [hasTicket] = useState<boolean>(tickets.length > 0);

    if (!hasTicket) {
        return (
            <div>
                <p>Нет билета</p>
            </div>
        );
    }

    return ( //отображение билетов согласно количеству в бд
        <>
            {tickets.map((ticket: TicketProps) => (
                <TicketContainer key={ticket.id} id={ticket.id} title={ticket.title} date={ticket.date} time={ticket.time} image={ticket.image} />
            ))}
        </>
    );
}

export default Ticket;