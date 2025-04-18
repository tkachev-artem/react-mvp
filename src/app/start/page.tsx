import Link from "next/link";

export default function Start() {
    return (
        <div className="flex flex-col items-center justify-between h-screen pb-24">
            <div className="flex flex-1 flex-col items-center justify-center">
                <h1 className="text-black  text-4xl font-semibold leading-10 tracking-normal">Твои <br /> отношения <br /> с городом</h1>
            </div>

            <div className="fixed bottom-5 left-5 right-5">
                <div className="flex w-full flex-row items-center justify-center gap-4">
                    <Link href="/auth" className="flex w-full h-[55px] justify-center items-center bg-blue-200 rounded-full text-black text-base font-semibold">Войти</Link>
                    <Link href="/signup" className="flex w-full h-[55px] justify-center items-center bg-white rounded-full border-2 border-solid border-black text-black text-base font-semibold">Создать аккаунт</Link>
                </div>
            </div>
        
        </div>
    )
}