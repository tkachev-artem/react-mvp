import { useState } from 'react';

interface PinCodeModalProps {
    onSubmit: (pinCode: string) => Promise<void>;
    onClose: () => void;
}

export function PinCodeModal({ onSubmit, onClose }: PinCodeModalProps) {
    const [pinCode, setPinCode] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pinCode.trim()) {
            setError('Введите PIN-код');
            return;
        }
        
        try {
            setError('');
            setIsSubmitting(true);
            await onSubmit(pinCode);
        } catch (error) {
            console.error('Ошибка при отправке PIN-кода:', error);
            setError('Неверный PIN-код. Попробуйте еще раз');
            setPinCode(''); // Очищаем поле при ошибке
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-[20px] p-6 w-[90%] max-w-[400px]">
                <h3 className="text-[18px] font-semibold mb-4 text-center">
                    Введите PIN-код
                </h3>
                <p className="text-[14px] text-gray-600 mb-4 text-center">
                    PIN-код был отправлен на ваш email
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={pinCode}
                        onChange={(e) => {
                            setError('');
                            setPinCode(e.target.value.replace(/\D/g, ''));
                        }}
                        placeholder="Введите PIN-код"
                        className={`w-full h-[37px] rounded-[40px] px-4 mb-2 ${
                            error ? 'bg-red-50 border border-red-300' : 'bg-gray-100'
                        }`}
                        maxLength={6}
                        disabled={isSubmitting}
                    />
                    {error && (
                        <p className="text-red-500 text-[14px] mb-4 text-center">
                            {error}
                        </p>
                    )}
                    <div className="flex gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-[37px] rounded-[40px] border border-gray-300"
                            disabled={isSubmitting}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="flex-1 h-[37px] rounded-[40px] bg-cyan-600 text-white disabled:bg-cyan-800"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Отправка...' : 'Отправить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 