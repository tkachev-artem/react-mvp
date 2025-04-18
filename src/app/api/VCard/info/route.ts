import { NextResponse } from 'next/server';

// Маршрут для получения информации о виртуальной карте пользователя
export async function GET(request: Request) {
  try {
    // Получаем токен из заголовка или из куки для аутентификации 
    const token = request.headers.get('Authorization')?.split('Bearer ')[1] || '';
    
    // Запрос к внешнему API для получения информации о карте
    const response = await fetch('http://87.242.117.38:8080/api/VCard/info', {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`
      },
    });
    
    // Проверяем, является ли ответ JSON
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Если не JSON, читаем как текст
      const text = await response.text();
      data = { message: text };
    }
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Ошибка при получении информации о карте:', error);
    return NextResponse.json(
      { message: 'Произошла ошибка при получении информации о карте' },
      { status: 500 }
    );
  }
} 