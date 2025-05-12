"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/auth-hook";
import { useRouter, useSearchParams } from "next/navigation";

interface FormProps {
    variant: "auth" | "register";
}

const inputStyle = "flex w-full h-14 items-start bg-white rounded-full border-2 border-solid border-black text-black text-base font-semibold pl-4 outline-none focus:border-blue-500 transition-colors";

const Form = ({variant}: FormProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, registerStep1, registerStep2, isLoading, error, isError } = useAuth();

    const [step, setStep] = useState(1);
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState(""); // Для кода подтверждения

    // Загружаем email из localStorage или URL параметров при монтировании компонента
    useEffect(() => {
        // Приоритет: 1) URL параметр email, 2) localStorage
        const emailFromUrl = searchParams.get('email');
        const savedEmail = localStorage.getItem('saved_email');
        
        if (emailFromUrl) {
            setEmail(emailFromUrl);
        } else if (savedEmail && variant === "auth") {
            setEmail(savedEmail);
        }
    }, [searchParams, variant]);

    // Переход на следующий шаг
    const nextStep = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (variant === "register") {
            if (step === 1) {
                // Переходим ко второму шагу (имя и фамилия)
                setStep(2);
            } else if (step === 2) {
                // Отправляем данные для первого шага регистрации
                registerStep1(
                    { 
                        email, 
                        firstName: name, 
                        lastName: lastname 
                    },
                    {
                        onSuccess: () => {
                            setStep(3); // Переходим к третьему шагу (пин-код)
                        }
                    }
                );
            }
        } else {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        if (variant === "auth") {
            login(
                { email, password },
                {
                    onSuccess: () => {
                        router.push("/main"); // перенаправление после авторизации
                    }
                }
            );
        } else if (variant === "register" && step === 3) {
            // Сохраняем email в localStorage перед отправкой формы регистрации
            localStorage.setItem('saved_email', email);
            
            // Отправляем данные для второго шага регистрации
            registerStep2(
                { 
                    email,
                    firstName: name,
                    lastName: lastname,
                    verificationCode 
                },
                {
                    onSuccess: () => {
                        router.push("/auth"); // перенаправление после регистрации
                    }
                }
            );
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
        // Валидация для первого шага - только email
        const datavalid = email.includes("@") && email.includes(".") && email.trim().length > 0;

        return (
            <div className="flex flex-col w-full gap-8">
                <div className="flex justify-start items-center gap-2.5 self-stretch">
                    <h1 className="text-black text-2xl text-start font-semibold">Введите свою почту, <br /> она понадобится дальше</h1>
                </div>
                
                <form className="flex flex-col w-full gap-5" onSubmit={nextStep}>
                    <input 
                        className={inputStyle}
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Почта" 
                    />
                    
                    {isError && (
                        <div className="text-red-500 text-sm">
                            {error?.message || "Ошибка при отправке данных. Проверьте введенную информацию."}
                        </div>
                    )}
                
                    <button 
                        className={`flex w-full h-14 justify-center items-center bg-emerald-200 rounded-full text-black text-base font-semibold ${datavalid ? "opacity-100" : "opacity-50"}`}
                        type="submit"
                        disabled={!datavalid || isLoading}
                    >
                        {isLoading ? "Загрузка..." : "Далее"}
                    </button>

                    <div className="flex justify-center items-center">
                        <Link 
                            href={email.trim() ? `/auth?email=${encodeURIComponent(email)}` : "/auth"} 
                            className="flex justify-center items-center text-neutral-500 text-base font-semibold"
                        >
                            Уже есть аккаунт?
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
    
    if (variant === "register" && step === 2) {
        // Валидация для второго шага - имя и фамилия
        const datavalid = name.trim().length > 0 && lastname.trim().length > 0;

        return (
            <div className="flex flex-col w-full gap-8">
                <div className="flex justify-start items-center self-stretch">
                    <h1 className="text-black text-start text-2xl font-semibold">Введите свое имя <br /> и фамилию</h1>
                </div>

                <form className="flex flex-col w-full gap-5" onSubmit={nextStep}>
                    <input 
                        className={inputStyle}
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Имя" 
                    />
                    
                    <input 
                        className={inputStyle}
                        type="text" 
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Фамилия" 
                    />
                    
                    {isError && (
                        <div className="text-red-500 text-sm">
                            {error?.message || "Ошибка при отправке данных. Проверьте введенную информацию."}
                        </div>
                    )}

                    <div className="flex flex-col gap-5 justify-center items-center">
                        <button 
                            className={`flex w-full h-14 justify-center items-center bg-emerald-200 rounded-full text-black text-base font-semibold ${datavalid ? "opacity-100" : "opacity-50"}`}
                            type="submit"
                            disabled={!datavalid || isLoading}
                        >
                            {isLoading ? "Отправка..." : "Далее"}
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

    if (variant === "register" && step === 3) {
        // Валидация для третьего шага - код подтверждения
        const datavalid = verificationCode.trim().length > 0;

        return (
            <div className="flex flex-col w-full gap-8">
                <div className="flex justify-start items-center self-stretch">
                    <h1 className="text-black text-start text-2xl font-semibold">Введите код <br /> из письма на почте</h1>
                </div>

                <form className="flex flex-col w-full gap-5" onSubmit={submitForm}>
                    <input 
                        className={inputStyle}
                        type="text" 
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Код подтверждения" 
                    />
                    
                    {isError && (
                        <div className="text-red-500 text-sm">
                            {error?.message || "Неверный код подтверждения. Попробуйте еще раз."}
                        </div>
                    )}

                    <div className="flex flex-col gap-5 justify-center items-center">
                        <button 
                            className={`flex w-full h-14 justify-center items-center bg-emerald-200 rounded-full text-black text-base font-semibold ${datavalid ? "opacity-100" : "opacity-50"}`}
                            type="submit"
                            disabled={!datavalid || isLoading}
                        >
                            {isLoading ? "Проверка..." : "Подтвердить"}
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