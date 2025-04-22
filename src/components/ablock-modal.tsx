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
    }
}

interface ModalTaskProps {
    task: {
        title: string;
        icon: string;
        taskpointstart: string;
        taskpointend: string;
        image: string;
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

                    <div className="flex flex-col gap-2">
                        <p className="text-black text-base font-normal">Это займет:</p>
                        <div className="flex flex-row gap-2"> 
                            <Image src="/icons/a-block/clock.svg" alt="clock" width={24} height={24} />
                            <p className="text-black text-3xl font-bold">{route.time}</p>
                        </div>
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
                            className="flex flex-row gap-2 w-64 h-18 bg-black text-white p-2 items-center justify-between rounded-full"
                            role="button"
                            onClick={() => setShowMap(true)}
                            tabIndex={0}
                            aria-label="Открыть карту"
                        >
                            <p className="flex pl-6 text-white text-xl font-bold">открыть карту</p>
                            <div className="w-14 h-14 bg-white flex items-center justify-center rounded-full">
                                <Image src="/icons/a-block/map.svg" alt="map" width={24} height={24} />
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

    return (
            <div className="fixed inset-0 z-50 bg-white overflow-hidden">
                <div className="absolute inset-0 overflow-y-auto pb-24">
                <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full" role="button" onClick={onClose}> {/* кнопка назад */}
                        <Image src="/icons/appnavigation/left-arrow.svg" alt="left-arrow" width={10} height={10} />
                </div>
                    <p>{event.title}</p>
                    <p>{event.datestart}</p>
                    <p>{event.dateend}</p>
                    <p>{event.image}</p>
                    <p>{event.type}</p>
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

    return (
            <div className="fixed inset-0 z-50 bg-white overflow-hidden">
                <div className="absolute inset-0 overflow-y-auto pb-24">
                <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full" role="button" onClick={onClose}> {/* кнопка назад */}
                        <Image src="/icons/appnavigation/left-arrow.svg" alt="left-arrow" width={10} height={10} />
                </div>
                    <p>{task.title}</p>
                    <p>{task.icon}</p>
                    <p>{task.taskpointstart}</p>
                    <p>{task.taskpointend}</p>
                    <p>{task.image}</p>
                </div>
            </div>
    );
}

export { ModalRoute, ModalEvent, ModalTask };
