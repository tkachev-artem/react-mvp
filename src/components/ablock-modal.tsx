import Image from "next/image";
import { useEffect, useState } from "react";

import YandexMap from "@/components/yandex-map";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ModalRouteProps {
    route: {
        title: string;
        time: string;
        description: string;
        image: string;
        link: string;
        coordinates?: {
            start: [number, number];
            end: [number, number];
        }
    }
}

interface ModalEventProps {
    event: {
        type: string;
        title: string;
        datestart: string;
        dateend: string;
        image: string;
        timestart: string;
        timeend: string;
        taketime: string;
        reward: string;
        price: string;
        description: string;
        coordinates?: number[];
    }
}

interface ModalTaskProps {
    task: {
        title: string;
        icon: string;
        taskpointstart: string;
        taskpointend: string;
        image: string;
        description: string;
        taskdescription: string;
        reward: string;
        taskcitytype: string;
        taskcityplaceinfo: string;
        coordinates: number[];
    }
}

const ModalRoute = ({ isOpen, onClose, route }: ModalProps & ModalRouteProps) => {
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        if (isOpen) {
            window.history.pushState(null, "", window.location.href);
            
            const handlePopState = () => {
                if (showMap) {
                    setShowMap(false);
                } else {
                    onClose();
                }
                window.history.pushState(null, "", window.location.href);
            };
            
            window.addEventListener("popstate", handlePopState);
            return () => {
                window.removeEventListener("popstate", handlePopState);
            };
        }
    }, [isOpen, onClose, showMap]);

    if (!isOpen) return null;

    if (showMap && route.coordinates) {
        return (
            <div className="fixed inset-0 z-50 bg-white">
                <div className="flex flex-col h-full">
                    <div className="p-4 flex items-center gap-4">
                        <div 
                            className="w-8 h-8 flex items-center justify-center bg-black rounded-full"
                            role="button"
                            onClick={() => setShowMap(false)}
                            tabIndex={0}
                            aria-label="Закрыть карту"
                        >
                            <Image src="/icons/appnavigation/left-arrow.svg" alt="left-arrow" width={10} height={10} />
                        </div>
                        <h2 className="text-black text-xl font-bold">{route.title}</h2>
                    </div>
                    <div className="flex-1">
                        <YandexMap
                            center={route.coordinates.start}
                            zoom={60}
                            route={{
                                start: route.coordinates.start,
                                end: route.coordinates.end
                            }}
                            interactive={true}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-hidden">
            <div className="absolute inset-0 overflow-y-auto pb-24">
                <div className="flex flex-col gap-5 p-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full" role="button" onClick={onClose}>
                        <Image src="/icons/appnavigation/left-arrow.svg" alt="left-arrow" width={10} height={10} />
                    </div>

                    <h1 className="w-[calc(100%-60px)] text-black text-4xl font-bold">{route.title}</h1>

                    <div className="relative w-full h-48">
                        <Image src={route.image} alt={route.title} fill className="object-cover rounded-xl" />
                    </div>

                    {/* время и награда */}

                    <div className="flex flex-col gap-2">

                    {/* линия */}
                    <div className="flex w-full h-0.5 flex-col justify-center items-center gap-0 bg-neutral-200 p-0 rounded-full"></div>
                    
                    <div className="flex flex-row justify-between items-center">

                    <div className="flex flex-col items-start gap-1">
                        <p className="text-black text-center text-base font-normal">Это займет:</p>
                            <div className="flex flex-row gap-2">
                                <Image src="/icons/a-block/clock.svg" alt="clock" width={20} height={20} />
                                <p className="text-black text-center text-lg font-bold">{route.time}</p>
                            </div>
                    </div>
                                
                             <div className="flex flex-col justify-center items-end gap-1">
                                <p className="text-black text-center text-base font-normal">Награда:</p>
                                <div className="flex justify-center items-center gap-1">
                                    <Image src="/icons/wallet/bonus.svg" alt="bonus" width={16} height={16} />
                                    <p className="text-black text-center text-lg font-bold">1</p>
                                </div>
                            </div>
                    </div>

                    {/* линия */}
                    <div className="flex w-full h-0.5 flex-col justify-center items-center gap-0 bg-neutral-200 p-0 rounded-full"></div>

                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-black text-base font-bold">Описание</p>
                        <p className="w-full h-full text-black text-base font-normal leading-[120%]">{route.description}</p>
                    </div>

                    {route.coordinates && (
                        <div className="w-full h-[300px] rounded-xl overflow-hidden relative">
                            <YandexMap
                                center={route.coordinates.start}
                                zoom={60}
                                route={{
                                    start: route.coordinates.start,
                                    end: route.coordinates.end
                                }}
                                interactive={false}
                            />
                            <div className="absolute inset-0" onClick={() => setShowMap(true)} role="button" />
                        </div>
                    )}

                    <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
                        <div 
                            className="flex flex-row gap-2 w-64 h-18 bg-white text-black p-2 items-center justify-between rounded-full border-2 border-black"
                            role="button"
                            onClick={() => setShowMap(true)}
                            tabIndex={0}
                            aria-label="Открыть карту"
                        >
                            <p className="flex pl-6 text-black text-xl font-bold">открыть карту</p>
                            <div className="w-14 h-14 bg-black flex items-center justify-center rounded-full">
                                <Image src="/icons/a-block/map-fill.svg" alt="map" width={24} height={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ModalEvent = ({ isOpen, onClose, event }: ModalProps & ModalEventProps) => {

    // Блокировка браузерного свайпа назад
    useEffect(() => {
        if (isOpen) {
            // Добавляем новую запись в историю
            window.history.pushState(null, "", window.location.href);
            
            // Обрабатываем нажатие кнопки назад
            const handlePopState = () => {
                onClose();
                // Предотвращаем дальнейшую навигацию
                window.history.pushState(null, "", window.location.href);
            };
            
            window.addEventListener("popstate", handlePopState);
            
            return () => {
                window.removeEventListener("popstate", handlePopState);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const hasDate = event.datestart || event.dateend;
    const hasTime = event.timestart || event.timeend;
    const hasPrice = event.price && event.price !== "0";
    const hasReward = event.reward && event.reward !== "0";
    const hasTakeTime = event.taketime && event.taketime !== "0";

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-hidden">
            <div className={`absolute inset-0 overflow-y-auto ${hasPrice ? "pb-24" : "pb-0"}`}>
                <div className="flex flex-col gap-5 p-4">
                    <div 
                        className="w-8 h-8 flex items-center justify-center bg-black rounded-full" 
                        role="button" 
                        onClick={onClose}
                        tabIndex={0}
                        aria-label="Вернуться назад"
                    >
                        <Image src="/icons/appnavigation/left-arrow.svg" alt="left-arrow" width={10} height={10} />
                    </div>

                    <h1 className="text-black text-4xl font-bold">{event.title}</h1>

                    <div className="relative w-full h-48">
                        <Image src={event.image} alt={event.title} fill className="object-cover rounded-xl" />
                    </div>

                    
                    {/* тип события и цена при наличии */}
                    <div className={`flex items-center self-stretch ${hasPrice ? "justify-between" : "justify-center"}`}> 
                        <div className="flex h-8 flex-col justify-center items-center gap-2.5 px-4 py-1 rounded-full border-2 border-solid border-black">
                            <p className="text-black text-center text-sm font-semibold">{event.type}</p>
                        </div>

                        {hasPrice && (
                            <div className="flex h-8 items-center gap-2 bg-emerald-200 px-4 py-1 rounded-full border-2 border-solid border-emerald-600">
                                <p className="text-black text-center text-sm font-semibold">{event.price}</p>
                                <Image src="/icons/wallet/ruble.svg" alt="ruble" width={16} height={16} />
                            </div>
                        )}
                    </div>

                    {/* дата и время, сколько займет и награда */}
                    {(hasDate || hasTime) && (
                    <div className="flex flex-col justify-center items-center gap-2">
                        {/* линия */}
                        <div className="flex w-full h-0.5 flex-col justify-center items-center gap-0 bg-neutral-200 p-0 rounded-full"></div>

                        {/* дата и время */}
                            <div className="flex w-full h-14 justify-between items-center">

                            {/* дата */}

                            {hasDate && (
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-black text-center text-base font-normal">Дата проведения:</p>
                                    <p className="text-black text-center text-lg font-bold">{event.datestart} – {event.dateend}</p>
                                </div>
                            )}

                            {/* время */}

                            {hasTime && (
                                <div className="flex flex-col items-end gap-1">
                                    <p className="text-black text-center text-base font-normal">Время:</p>
                                    <p className="text-black text-center text-lg font-bold">{event.timestart} – {event.timeend}</p>
                                </div>
                            )}
                            </div>

                        {/* линия */}
                        {!hasReward && !hasTakeTime && (
                            <div className="flex w-full h-0.5 flex-col justify-center items-center gap-0 bg-neutral-200 p-0 rounded-full">
                            </div>
                        )}
                        
                    </div>
                    )}

                    {/* сколько займет времени и награда */}

                    {(hasReward || hasTakeTime) && (
                        <div className={`flex flex-col justify-center items-center gap-2 ${(hasDate || hasTime) ? "-mt-2.5" : ""}`}>
                        
                        {/* линия */}
                        <div className="flex w-full h-0.5 flex-col justify-center items-center gap-0 bg-neutral-200 p-0 rounded-full"></div>

                        <div className="flex w-full h-14 justify-between items-center">
                            {/* сколько займет времени */}
                            {hasTakeTime && (
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-black text-center text-base font-normal">Это займет:</p>
                                    <div className="flex flex-row gap-2">
                                        <Image src="/icons/a-block/clock.svg" alt="clock" width={20} height={20} />
                                        <p className="text-black text-center text-lg font-bold">{event.taketime}</p>
                                    </div>
                                </div>
                            )}

                            {/* награда */}
                            {hasReward && (
                                <div className={`flex flex-col justify-center ${hasTakeTime ? "items-end" : "items-start"} gap-1`}>
                                    <p className="text-black text-center text-base font-normal">Награда:</p>
                                    <div className="flex justify-center items-center gap-1">
                                        <Image src="/icons/wallet/bonus.svg" alt="bonus" width={16} height={16} />
                                        <p className="text-black text-center text-lg font-bold">{event.reward}</p>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* линия */}
                        <div className="flex w-full h-0.5 flex-col justify-center items-center gap-0 bg-neutral-200 p-0 rounded-full"></div>

                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <p className="text-black text-base font-bold">Описание</p>
                        <p className="w-full h-full text-black text-base font-normal leading-[120%]">{event.description}</p>
                    </div>

                    {event.coordinates && event.coordinates.length >= 2 && (
                        <div className="w-full h-[300px] rounded-xl overflow-hidden">
                            <YandexMap 
                                center={event.coordinates}
                                marker={event.coordinates ? { coordinates: event.coordinates} : null}
                            />
                        </div>
                    )}

                    {event.price && event.price !== "0" && (
                        <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
                            <div 
                                className="flex flex-row gap-2 w-64 h-18 bg-white text-black p-2 items-center justify-between rounded-full border-2 border-black"
                                role="button"
                                tabIndex={0}
                                aria-label="купить билет"
                            >
                                <p className="flex pl-6 text-black text-xl font-bold">купить билет</p>
                                <div className="w-14 h-14 bg-black flex items-center justify-center rounded-full">
                                    <Image src="/icons/a-block/ticket-fill.svg" alt="plus" width={32} height={32} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const ModalTask = ({ isOpen, onClose, task }: ModalProps & ModalTaskProps) => {
    

    // Блокировка браузерного свайпа назад
    useEffect(() => {
        if (isOpen) {
            // Добавляем новую запись в историю
            window.history.pushState(null, "", window.location.href);
            
            // Обрабатываем нажатие кнопки назад
            const handlePopState = () => {
                onClose();
                // Предотвращаем дальнейшую навигацию
                window.history.pushState(null, "", window.location.href);
            };
            
            window.addEventListener("popstate", handlePopState);
            
            return () => {
                window.removeEventListener("popstate", handlePopState);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;
    
    const hastaskcitytype = task.taskcitytype;
    const hastaskcityplaceinfo = task.taskcityplaceinfo;
    const hastaskreward = task.reward;
    const hastaskcoordinates = task.coordinates;

    const hastaskpointstart = task.taskpointstart && task.taskpointstart == "1";

    return (
            <div className={`fixed inset-0 z-50 ${hastaskpointstart ? "bg-amber-200" : "bg-white"} overflow-hidden`}>
                <div className="absolute inset-0 overflow-y-auto pb-24">
                <div className="flex flex-col gap-5 p-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full" role="button" onClick={onClose}> {/* кнопка назад */}
                        <Image src="/icons/appnavigation/left-arrow.svg" alt="left-arrow" width={10} height={10} />
                    </div>

                    <div className="flex flex-col items-start self-stretch">
                        <p className="text-black text-4xl font-bold">{task.title}</p>
                    </div>

                    {hastaskcitytype && hastaskcityplaceinfo && (
                    <div className="flex w-full items-center gap-2">
                        <div className={`flex h-8 flex-col justify-center items-center gap-2.5 ${hastaskpointstart ? "bg-white" : "bg-yellow-200"} px-4 py-1 rounded-full`}>
                            <p className="text-black text-center text-sm font-semibold">{task.taskcitytype}</p>
                        </div>

                        <div className={`flex h-8 flex-col justify-center items-center gap-2.5 ${hastaskpointstart ? "bg-transparent" : "bg-white"} px-4 py-1 rounded-full border-2 border-solid border-black`}>
                            <p className="text-black text-center text-sm font-semibold">{task.taskcityplaceinfo}</p>
                        </div>
                    </div>
                    )}

                    <div className="relative w-full h-48">
                        <Image src={task.image} alt={task.title} fill className="object-cover rounded-xl" />
                    </div>

                    <div className="flex w-full items-center gap-4">
                        <div className={`flex w-[60px] h-[60px] flex-col justify-center items-center aspect-[1/1] ${hastaskpointstart ? "bg-white" : "bg-neutral-200"} p-0 rounded-full`}>
                            <Image src={task.icon} alt={task.title} width={25} height={20} />
                        </div>

                        <div className="flex h-[60px] flex-col justify-center items-center">
                            <p className="self-stretch text-black text-sm font-normal">Задача</p>
                            <p className="self-stretch text-black text-sm font-semibold">{task.taskdescription}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 self-stretch">
                        <div className={`flex h-0.5 flex-col justify-center items-center gap-0 self-stretch ${hastaskpointstart ? "bg-black" : "bg-neutral-200"} p-0 rounded-full`}></div>

                        {hastaskreward && (
                        <div className="flex justify-center items-center self-stretch">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-black text-center text-base font-normal">Награда</p>

                                <div className="flex justify-center items-center gap-1">
                                    <Image src="/icons/wallet/bonus.svg" alt="bonus" width={16} height={19} />
                                    <p className="text-black text-center text-lg font-bold">{task.reward}</p>
                                </div>
                            </div>
                        </div>
                        )}

                        <div className={`flex h-0.5 flex-col justify-center items-center gap-0 self-stretch ${hastaskpointstart ? "bg-black" : "bg-neutral-200"} p-0 rounded-full`}></div>
                    </div>


                    <div className="flex flex-col gap-2">
                        <p className="text-black text-base font-bold">Описание</p>
                        <p className="w-full h-full text-black text-base font-normal leading-[120%]">{task.description}</p>
                    </div>

                    {hastaskcoordinates && hastaskcoordinates.length >= 2 && (
                        <div className="w-full h-[300px] rounded-xl overflow-hidden">
                            <YandexMap 
                                center={hastaskcoordinates}
                                marker={hastaskcoordinates ? { coordinates: hastaskcoordinates} : null}
                            />
                        </div>
                    )}

                    {hastaskpointstart && (
                        <div className="fixed bottom-5 left-1/2 -translate-x-1/2">

                        <div 
                            className="flex flex-row gap-2 w-64 h-18 bg-amber-200 text-white p-2 items-center justify-between rounded-full border-2 border-black"
                            role="button"
                            tabIndex={0}
                            aria-label="купить билет"
                        >
                            <p className="flex pl-6 text-black text-xl font-bold">выполнено</p>
                            <div className="w-14 h-14 bg-white flex items-center justify-center rounded-full">
                                <Image src="/icons/a-block/checkmark.svg" alt="check" width={32} height={32} />
                            </div>
                        </div>
                    </div>
                    )}

                    {!hastaskpointstart && (
                        <div className="fixed bottom-5 left-1/2 -translate-x-1/2">

                        <div 
                            className="flex flex-row gap-2 w-64 h-18 bg-white text-black p-2 items-center justify-between rounded-full border-2 border-black"
                            role="button"
                            tabIndex={0}
                            aria-label="купить билет"
                        >
                            <p className="flex pl-6 text-black text-xl font-bold">выполнить</p>
                            <div className="w-14 h-14 bg-black flex items-center justify-center rounded-full">
                                <Image src="/icons/a-block/chevron-right.svg" alt="chevron-right" width={24} height={24} />
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export { ModalRoute, ModalEvent, ModalTask };
