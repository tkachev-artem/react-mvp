"use client";

import { useEffect, useState } from "react";

type MobileOnlyProps = {
  children: React.ReactNode;
};

const MobileOnly = ({ children }: MobileOnlyProps) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Проверяем при первой загрузке
    checkIsMobile();

    // Добавляем обработчик изменения размера окна
    window.addEventListener("resize", checkIsMobile);

    // Убираем обработчик при размонтировании компонента
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Показываем заглушку только когда точно определили, что это не мобильное устройство
  if (typeof window !== "undefined" && !isMobile) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white p-5 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-4">Только для мобильных устройств, карта горожанина – это про движение</h1>
          <p className="text-gray-600 mb-6">
            Пожалуйста, откройте приложение на мобильном устройстве ☆
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MobileOnly; 