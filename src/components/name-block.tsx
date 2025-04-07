"use client";

import Link from "next/link";
import Image from "next/image";

interface NameBlockProps {
    titleName: string;
    buttontransferName: string;
    buttontransferIcon: string;
    link: string;
}

const NameBlock = ({ titleName = "Название", buttontransferName = "Название кнопки", buttontransferIcon = "/icons/иконка.svg", link = "/"}: NameBlockProps) => {

    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl text-black font-semibold">{titleName}</h1>
            <div className="flex justify-center items-center gap-2 text-zinc-500">
                <Link href={link}>
                    <button className="flex items-center gap-2">
                        {buttontransferName}
                    <Image src={buttontransferIcon} alt="chevron" width={9} height={12} />
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default NameBlock;