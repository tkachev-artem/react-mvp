import { useEffect, useRef } from 'react';

// Глобальная переменная для отслеживания загрузки скрипта
let isScriptLoading = false;
let isScriptLoaded = false;

interface YandexMapProps {
  center: [number, number]; // [широта, долгота]
  zoom?: number;
  route?: {
    start: [number, number];
    end: [number, number];
  };
  interactive?: boolean;
}

// Объявление типов для Яндекс Карт
declare global {
  interface Window {
    ymaps: {
      ready: (callback: () => void) => void;
      Map: new (
        element: HTMLElement,
        options: {
          center: [number, number];
          zoom: number;
          controls: string[];
        }
      ) => {
        geoObjects: {
          add: (obj: unknown) => void;
        };
        behaviors: {
          disable: (behaviors: string[]) => void;
        };
      };
      multiRouter: {
        MultiRoute: new (
          options: {
            referencePoints: [number, number][];
            params: { routingMode: string };
          },
          settings: { boundsAutoApply: boolean }
        ) => object;
      };
    };
  }
}

// Функция для загрузки скрипта Яндекс Карт (вызывается только один раз)
const loadYandexMapScript = (callback: () => void) => {
  if (isScriptLoaded) {
    callback();
    return;
  }

  if (isScriptLoading) {
    const checkYmapsReady = setInterval(() => {
      if (isScriptLoaded) {
        clearInterval(checkYmapsReady);
        callback();
      }
    }, 100);
    return;
  }

  isScriptLoading = true;
  const script = document.createElement('script');
  script.src = `https://api-maps.yandex.ru/2.1/?apikey=607199fd-1acf-4de3-9acc-e57feda44c6b&lang=ru_RU`;
  script.async = true;
  
  script.onload = () => {
    isScriptLoaded = true;
    isScriptLoading = false;
    callback();
  };
  
  document.body.appendChild(script);
};

const YandexMap = ({ center, zoom = 15, route, interactive = true }: YandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Инициализация карты после загрузки скрипта
    const initMap = () => {
      window.ymaps.ready(() => {
        if (!mapRef.current) return;
        
        const map = new window.ymaps.Map(mapRef.current, {
          center,
          zoom,
          controls: interactive ? ['zoomControl', 'fullscreenControl'] : [],
        });
        
        // Отключаем все взаимодействия с картой, если interactive === false
        if (!interactive) {
          map.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom', 'multiTouch', 'rightMouseButtonMagnifier']);
        }
        
        // Если есть маршрут, добавляем его на карту
        if (route) {
          const multiRoute = new window.ymaps.multiRouter.MultiRoute({
            referencePoints: [route.start, route.end],
            params: { routingMode: 'pedestrian' }
          }, {
            boundsAutoApply: true
          });
          
          map.geoObjects.add(multiRoute);
        }
      });
    };
    
    // Загружаем скрипт, если он еще не был загружен
    loadYandexMapScript(initMap);
    
    // Нет необходимости в удалении скрипта при размонтировании
  }, [center, zoom, route, interactive]);
  
  return <div ref={mapRef} className="w-full h-full rounded-xl" />;
};

export default YandexMap;