import { useEffect, useRef } from 'react';

// Глобальная переменная для отслеживания загрузки скрипта
let isScriptLoading = false;
let isScriptLoaded = false;

type Coordinates = [number, number] | number[];

interface YandexMapProps {
  center: Coordinates | null; // [широта, долгота] или null если нет координат
  zoom?: number;
  route?: {
    start: Coordinates;
    end: Coordinates;
  } | null;
  marker?: {
    coordinates: Coordinates;
    title?: string;
  } | null;
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
      Placemark: new (
        coordinates: [number, number],
        properties?: {
          iconCaption?: string;
        },
        options?: {
          preset?: string;
        }
      ) => object;
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

// Функция для преобразования координат в формат [number, number]
const ensureTupleCoordinates = (coords: Coordinates): [number, number] => {
  if (Array.isArray(coords) && coords.length >= 2) {
    return [coords[0], coords[1]];
  }
  // Если координаты некорректные, возвращаем дефолтные
  return [0, 0];
};

const YandexMap = ({ center, zoom = 15, route, marker, interactive = true }: YandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Если нет координат, не инициализируем карту
    if (!center) return;
    
    // Инициализация карты после загрузки скрипта
    const initMap = () => {
      window.ymaps.ready(() => {
        if (!mapRef.current) return;
        
        const centerCoords = ensureTupleCoordinates(center);
        
        const map = new window.ymaps.Map(mapRef.current, {
          center: centerCoords,
          zoom,
          controls: interactive ? ['zoomControl', 'fullscreenControl'] : [],
        });
        
        // Отключаем все взаимодействия с картой, если interactive === false
        if (!interactive) {
          map.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom', 'multiTouch', 'rightMouseButtonMagnifier']);
        }
        
        // Если есть маршрут, добавляем его на карту
        if (route) {
          const startCoords = ensureTupleCoordinates(route.start);
          const endCoords = ensureTupleCoordinates(route.end);
          
          const multiRoute = new window.ymaps.multiRouter.MultiRoute({
            referencePoints: [startCoords, endCoords],
            params: { routingMode: 'pedestrian' }
          }, {
            boundsAutoApply: true
          });
          
          map.geoObjects.add(multiRoute);
        }
        
        // Если есть маркер, добавляем его на карту
        if (marker) {
          const markerCoords = ensureTupleCoordinates(marker.coordinates);
          
          const placemark = new window.ymaps.Placemark(
            markerCoords, 
            { iconCaption: marker.title }, 
            { preset: 'islands#redDotIconWithCaption' }
          );
          
          map.geoObjects.add(placemark);
        }
      });
    };
    
    // Загружаем скрипт, если он еще не был загружен
    loadYandexMapScript(initMap);
    
    // Нет необходимости в удалении скрипта при размонтировании
  }, [center, zoom, route, marker, interactive]);
  
  // Если координаты центра не заданы, не отображаем карту
  if (!center) return null;
  
  return <div ref={mapRef} className="w-full h-full rounded-xl" />;
};

export default YandexMap;