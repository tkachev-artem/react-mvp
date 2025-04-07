"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface NavProps {
    name: string;
    icon: string;
    iconInactive: string;
    link: string;
    width: number;
    height: number;
}

const NavItem : NavProps[] = [
    {
        name: "Главная",
        icon: "/icons/nav/home.svg",
        iconInactive: "/icons/nav/inactive/home.svg",
        width: 26,
        height: 22,
        link: "/main",
    },

    {
        name: "Карта",
        icon: "/icons/nav/card.svg",
        iconInactive: "/icons/nav/inactive/card.svg",
        width: 26,
        height: 19,
        link: "/card",
    },
    
    {
        name: "Афиша",
        icon: "/icons/nav/afisha.svg",
        iconInactive: "/icons/nav/inactive/afisha.svg",
        width: 31,
        height: 22,
        link: "/afisha",
    },

    {
        name: "Профиль",
        icon: "/icons/nav/profile.svg",
        iconInactive: "/icons/nav/inactive/profile.svg",
        width: 18,
        height: 19,
        link: "/profile",
    }
]

const NavMen = () => {

    const pathname = usePathname(); //хук для проверки нажатия

return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center gap-10 border-t-[1.5px] border-neutral-200 bg-white px-0 py-3">
        {NavItem.map((item) => {
            const isActive = pathname === item.link;
            return (
                <Link href={item.link} key={item.name}>
                    <div className={`flex h-[42px] flex-col justify-between items-center ${isActive ? "text-primary-500" : "text-neutral-500"}`}>
                        <div className="flex flex-col items-center gap-1">
                            <Image src={isActive ? item.icon : item.iconInactive} alt={item.name} width={item.width} height={item.height} />
                        </div>
                        <p className="text-xs font-medium">{item.name}</p>
                    </div>
                </Link>
            );
        })}
    </div>
);

};

export default NavMen;