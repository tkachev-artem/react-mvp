import { Suspense } from "react";
import Form from "../../components/form";

export default function Auth() {
    return (
        <div className="flex w-full h-[100dvh] flex-col justify-center items-center bg-white overflow-hidden">
            <Suspense fallback={<div>Загрузка...</div>}>
                <Form variant="auth" />
            </Suspense>
        </div>
    )
}