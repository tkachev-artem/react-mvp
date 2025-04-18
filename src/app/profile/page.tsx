"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
    const { logout } = useAuth();

    return (
        <div>
            <button className= "bg-red-200 text-black px-4 py-2 rounded-md hover:bg-red-400" onClick={() => {
                logout();
            }}>Выйти</button>
        </div>
    )
}
