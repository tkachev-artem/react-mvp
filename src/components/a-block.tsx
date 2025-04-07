"use client"

import Image from "next/image";
import { useState } from "react";

interface ABlockProps {
    variant: number;
    title: string;
    type: string;
    //image: string;
    time: string;
    datestart: string;
    dateend: string;
    taskpoint: string;
    iconpoint: string;
}

const ABlock = ({ variant, title, time, type = "тип", datestart = "1 месяца", dateend = "2 месяца", iconpoint = "/icons/a-block/camera.svg", taskpoint = "0/4" }: ABlockProps) => {

    const [hasvariant] = useState<boolean>(Boolean(variant));

    if (!hasvariant) {
        return (
            <div>
                <p>Нет варианта</p>
            </div>
        )
    }

    if (variant === 1) {
        return (
            <div className="flex w-full h-[190px] flex-col justify-between items-start rounded-3xl bg-slate-100 p-4">
                <div className="flex h-[60px] flex-col items-start gap-2.5 shrink-0 self-stretch">
                    <h1 className="text-black text-lg font-semibold whitespace-pre-wrap">{title}</h1>
                </div>

                <div className="flex flex-col justify-center items-end gap-2.5 self-stretch">
                    <div className="flex h-6 flex-col justify-center items-center gap-2.5 rounded-full bg-neutral-200 px-4 py-0">
                        <p className="text-black text-xs font-medium">{time}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 2) {
        return (
            <div className="flex w-full h-[190px] flex-col justify-between items-start rounded-3xl bg-slate-100 p-4">
                <div className="flex flex-col justify-center items-start gap-2 self-stretch">
                    <p className="text-black text-xs font-medium">{type}</p>
                    <h1 className="text-black text-2xl font-semibold">{title}</h1>
                </div>

                <div className="flex justify-end items-center gap-2 self-stretch">
                    <div className="flex h-6 justify-center items-center gap-2 rounded-full bg-neutral-200 px-4 py-0">
                        <p className="text-black text-xs font-medium">{datestart}</p>
                        <div className="flex w-3 h-px flex-col justify-center items-center bg-black"/>
                        <p className="text-black text-xs font-medium">{dateend}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="flex w-full h-[190px] flex-col justify-between items-start rounded-3xl bg-slate-100 p-4">
                <div className="flex h-[60px] flex-col items-start gap-2.5 shrink-0 self-stretch">
                    <h1 className="text-black text-lg font-semibold whitespace-pre-wrap">{title}</h1>
                </div>

                <div className="flex justify-end items-center gap-2 self-stretch">
                    <div className="flex w-6 h-6 items-center justify-center rounded-full bg-neutral-200">
                        <Image 
                            src={iconpoint} 
                            alt="camera" 
                            width={13} 
                            height={10}
                            className="w-auto h-auto"
                        />
                    </div>

                    <div className="flex h-6 justify-center items-center gap-2 rounded-full bg-neutral-200 px-4">
                        <p className="text-black text-xs font-medium">{taskpoint}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ABlock;