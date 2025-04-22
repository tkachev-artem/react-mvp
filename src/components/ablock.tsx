"use client";

import routes from "@/hooks/routedata";
import events from "@/hooks/eventdata";
import tasks from "@/hooks/taskdata";

import Image from "next/image";

import { useState } from "react";

import { ModalRoute, ModalEvent, ModalTask } from "@/components/ablock-modal";

interface routeProps {
    id: number;
    title: string;
    time: string;
    image: string;
    description: string;
}

interface eventProps {
    id: number;
    type: string;
    title: string;
    datestart: string;
    dateend: string;
    image: string;
}

interface taskProps {
    id: number;
    title: string;
    icon: string;
    taskpointstart: string;
    taskpointend: string;
    image: string;
}

const RouteContainer = ({ title, time, image, description }: routeProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex flex-col w-full" onClick={handleModalOpen} role="button">
                <div className="flex h-10 flex-col justify-center items-center self-stretch bg-white p-2 rounded-xl border-2 border-solid border-black">
                    <p className="text-black text-sm font-semibold">{title}</p>
            </div>

            <div className="w-full h-full aspect-[171/92] rounded-xl relative">
                <Image src={image} alt={title} fill className="object-cover rounded-xl" />
            </div>

            <div className="flex h-10 justify-center items-center gap-2 self-stretch bg-white p-2 rounded-xl border-2 border-solid border-black">
                <Image src="/icons/a-block/clock.svg" alt="clock" width={15} height={14} />
                <p className="text-black text-sm font-semibold">{time}</p>
            </div>
        </div>

        <ModalRoute isOpen={isModalOpen} onClose={handleModalClose} route={{ title, time, description, image, link: "" }} />

        </>
    );
}

const EventContainer = ({ type, title, datestart, dateend, image }: eventProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <> 
            <div className="flex w-full flex-col justify-center items-center gap-4 bg-neutral-100 rounded-xl p-4 " onClick={handleModalOpen} role="button">
                <div className="flex flex-col justify-center items-center gap-2 self-stretch">
                <div className="flex justify-center items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-solid border-black">
                    <p className="text-black text-xs font-semibold">{type}</p>
                </div>

                <h1 className="text-black text-2xl font-semibold">{title}</h1>
            </div>

            <div className="flex w-full h-full aspect-[321/173] rounded-xl relative">
                <Image src={image} alt={title} fill className="object-cover rounded-xl" />
            </div>

            <div className="flex justify-center items-center self-stretch">
                <div className="flex justify-center items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-solid border-black">
                    <p className="text-black text-xs font-semibold">{datestart}</p>
                    <div className="flex w-3 h-px flex-col justify-center items-center bg-black"></div>
                    <p className="text-black text-xs font-semibold">{dateend}</p>
                </div>
                </div>
            </div>

            <ModalEvent isOpen={isModalOpen} onClose={handleModalClose} event={{ type, title, datestart, dateend, image }} />

        </>
    );
}

const TaskContainer = ({ title, icon, taskpointstart, taskpointend, image }: taskProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <div className="flex w-full flex-col" onClick={handleModalOpen} role="button">
           <div className="flex h-10 flex-col justify-center items-center self-stretch bg-white p-2 rounded-xl border-2 border-solid border-black">
                <h1 className="text-black text-sm font-semibold">{title}</h1>
           </div>

           <div className="w-full h-full aspect-[171/92] rounded-xl relative">
                <Image src={image} alt={title} fill className="object-cover rounded-xl" />
           </div>

           <div className="flex items-start self-stretch">
                <div className="flex justify-center items-center w-10 h-10 min-w-[40px] min-h-[40px] aspect-square bg-neutral-100 rounded-full border-2 border-solid border-black">
                    <Image src={icon} alt={title} width={17} height={17} />
                </div>

                <div className="flex w-full h-10 gap-1 justify-center items-center bg-neutral-100 rounded-3xl border-2 border-solid border-black">
                    <p className="text-black text-base font-semibold">{taskpointstart}</p>
                    <p className="text-black text-base font-semibold">/</p>
                    <p className="text-black text-base font-semibold">{taskpointend}</p>
                </div>
           </div>
        </div>

        <ModalTask isOpen={isModalOpen} onClose={handleModalClose} task={{ title, icon, taskpointstart, taskpointend, image }} />

        </>
    );
}

const RouteBlock = () => { //проверка на наличие в бд маршрутов
    const [hasRoute] = useState<boolean>(routes.length > 0);

    if (!hasRoute) {
        return (
            <div>
                <p>Нет маршрутов</p>
            </div>
        );
    }

    return (
        <>
            {routes.map((route: routeProps) => (
                <RouteContainer key={route.id} id={route.id} title={route.title} time={route.time} image={route.image} description={route.description} />
            ))}
        </>
    );
}

export { RouteBlock };

const EventBlock = () => { //проверка на наличие в бд событий
    const [hasEvent] = useState<boolean>(events.length > 0);

    if (!hasEvent) {
        return (
            <div>
                <p>Нет событий</p>
            </div>
        );
    }

    return (
        <> 
            {events.map((event: eventProps) => (
                <EventContainer key={event.id} id={event.id} type={event.type} title={event.title} datestart={event.datestart} dateend={event.dateend} image={event.image} />
            ))}
        </>
    );
}

export { EventBlock };

const TaskBlock = () => { //проверка на наличие в бд заданий
    const [hasTask] = useState<boolean>(tasks.length > 0);

    if (!hasTask) {
        return (
            <div>
                <p>Нет заданий</p>
            </div>
        );
    }

    return (
        <>
            {tasks.map((task: taskProps) => (
                <TaskContainer key={task.id} id={task.id} title={task.title} icon={task.icon} taskpointstart={task.taskpointstart} taskpointend={task.taskpointend} image={task.image} />
            ))}
        </>
    );
}

export { TaskBlock };