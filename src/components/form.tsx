"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface FormProps {
    variant: "auth" | "register";
}

const inputStyle = "flex w-full h-14 items-start bg-white rounded-full border-2 border-solid border-black text-black text-base font-semibold pl-4 outline-none focus:border-blue-500 transition-colors";

const Form = ({variant}: FormProps) => {
    const router = useRouter();
    const { login, isLoading, error, isError } = useAuth();

    const [step, setStep] = useState(1);
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");

    // Переход на следующий шаг
    const nextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const prevStep = () => {
        setStep(1);
    };

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        //console.log("Отправка данных:", { email, name, lastname, password });
        //alert("Форма отправлена!");

        if (variant === "auth") {
            login(
                { email, password },
                {
                    onSuccess: () => {
                        router.push("/main"); // перенаправление после авторизации
                    }
                }
            );
        } else {
            console.log("Отправка данных:", { email, name, lastname, password });
            alert("Форма отправлена!");
        }
    };

    if (variant === "auth") {
        
        const datavalid = email.includes("@") && email.includes(".") && email.trim().length > 0 && password.trim().length > 0;

        return (

            <div className="flex flex-col w-full gap-8">

                <div className="flex justify-start items-center">
                    <h1 className="text-black text-2xl text-start font-semibold">Введите свою почту <br /> и пароль</h1>
                </div>

                <form className="flex flex-col w-full gap-5" onSubmit={submitForm}>
                    <input 
                        className={inputStyle}
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" 
                />
                <input 
                    className={inputStyle}
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль" 
                />

                    {isError && (
                        <div className="text-red-500 text-sm">
                            {error?.message || "Ошибка авторизации. Проверьте введенные данные."}
                        </div>
                    )}

                <button 
                    className={`flex w-full h-14 justify-center items-center bg-blue-200 rounded-full text-black text-base font-semibold ${datavalid ? "opacity-100" : "opacity-50"}`}
                    type="submit"
                    disabled={!datavalid || isLoading}
                >
                    {isLoading ? "Загрузка..." : "Войти"}
                </button>

                <div className="flex justify-center items-center">
                    <Link href="/signup" className="flex justify-center items-center text-neutral-500 text-base font-semibold">Ещё нет аккаунта?</Link>
                </div>
                </form> 
            </div>
        );
    }

    if (variant === "register" && step === 1) {

        const datavalid = email.includes("@") && email.includes(".") && email.trim().length > 0;

        return (

            <div className="flex flex-col w-full gap-8">

                <div className="flex justify-start items-center gap-2.5 self-stretch">
                    <h1 className="text-black text-2xl text-start font-semibold">Введите свою почту, <br /> она понадобиться дальше</h1>
                </div>
                
                <form className="flex flex-col w-full gap-5" onSubmit={nextStep}>
                    
                    
                <input 
                    className={inputStyle}
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Почта" 
                />
                
                <button 
                    className={`flex w-full h-14 justify-center items-center bg-blue-200 rounded-full text-black text-base font-semibold ${datavalid ? "opacity-100" : "opacity-50"}`}
                    type="submit"
                    disabled={!datavalid}
                >
                    Далее
                </button>

                <div className="flex justify-center items-center">
                    <Link href="/auth" className="flex justify-center items-center text-neutral-500 text-base font-semibold">Уже есть аккаунт?</Link>
                </div>
                </form>
            </div>
        );
    }
    
    if (variant === "register" && step === 2) {

        const datavalid = name.trim().length > 0 && lastname.trim().length > 0;

        return (

            <div className="flex flex-col w-full gap-8">

                <div className="flex justify-start items-center self-stretch">
                    <h1 className="text-black text-start text-2xl font-semibold">Введите свое имя <br /> и фамилию</h1>
                </div>

                <form className="flex flex-col w-full gap-5" onSubmit={submitForm}>
                    
                <input 
                    className={inputStyle}
                    type="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя" 
                />
                
                <input 
                    className={inputStyle}
                    type="lastname" 
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Фамилия" 
                />
                
                <div className="flex flex-col gap-5 justify-center items-center">
                    <button 
                        className={`flex w-full h-14 justify-center items-center bg-blue-200 rounded-full text-black text-base font-semibold ${datavalid ? "opacity-100" : "opacity-50"}`}
                        type="submit"
                        disabled={!datavalid}
                    >
                        Готово
                    </button>

                    <button 
                        className="flex justify-center items-center text-neutral-500 text-base font-semibold"
                        type="button"
                        onClick={prevStep}
                    >
                        Вернуться на предыдущий шаг
                    </button>
                </div>
                </form>
            </div>
        );
    }
};

export default Form;