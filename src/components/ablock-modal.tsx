import Image from "next/image";

interface RouteModalProps {
    isOpen: boolean;
    onClose: () => void;
    route: {
        title: string;
        time: string;
        description: string;
        image: string;
        link: string;
    }
}

const RouteModal = ({ isOpen, onClose, route }: RouteModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-hidden">
            <div className="absolute inset-0 overflow-y-auto pb-24">
                <div className="flex flex-col gap-5 p-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full" role="button" onClick={onClose}> {/* кнопка назад */}
                        <Image src="/icons/appnavigation/left-arrow.svg" alt="left-arrow" width={10} height={10} />
                    </div>

                    <h1 className="w-[calc(100%-40px)] text-black text-4xl font-bold">{route.title}</h1>

                    <div className="relative w-full h-48">
                        <Image src={route.image} alt={route.title} fill className="object-cover rounded-xl" />
                    </div>

                    <div className="flex flex-col gap-2"> {/* время */}
                        <p className="text-black text-base font-normal">Это займет:</p>

                        <div className="flex flex-row gap-2"> 
                            <Image src="/icons/a-block/clock.svg" alt="clock" width={24} height={24} />
                            <p className="text-black text-3xl font-bold">{route.time}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2"> {/* описание */}
                        <p className="text-black text-base font-bold">Описание</p>
                        <p className="w-full h-full text-black text-base font-normal leading-[120%]">я оса, меня ебали 3 скворца, вдруг скворец присел на конец, а стрелец пасет овец, нет скворца, сидит овца, в жопу ей летит оса, а скворец наконец, понял что он не самец, таки выебла оса в жопу бедного овца, не смотря на бедного стрельца, который остался без хуйца, ведь овцу ебла оса, а стрелец ебал овца, вот такая вот конца, 3 скворца ебли оса, а могли ебать овца</p>
                    </div>

                    <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
                        <div className="flex flex-row gap-2 w-64 h-18 bg-black text-white p-2 items-center justify-between rounded-full" role="button"> {/* кнопка открыть карту */}
                            <p className="flex pl-6 text-white text-xl font-bold">открыть карту</p>

                            <div className="w-14 h-14 bg-white flex items-center justify-center rounded-full">
                                <Image src="/icons/a-block/map.svg" alt="map" width={24} height={24} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2"> {/* описание */}
                        <p className="text-black text-base font-bold">Описание</p>
                        <p className="w-full h-full text-black text-base font-normal leading-[120%]">я оса, меня ебали 3 скворца, вдруг скворец присел на конец, а стрелец пасет овец, нет скворца, сидит овца, в жопу ей летит оса, а скворец наконец, понял что он не самец, таки выебла оса в жопу бедного овца, не смотря на бедного стрельца, который остался без хуйца, ведь овцу ебла оса, а стрелец ебал овца, вот такая вот конца, 3 скворца ебли оса, а могли ебать овца</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RouteModal;
