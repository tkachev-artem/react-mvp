import { NextResponse } from 'next/server';

// API роут для второго шага регистрации с кодом подтверждения
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Отправляем на бэкенд
    const response = await fetch('http://87.242.117.38:8080/api/Auth/register-step2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify(body),
    });
    
    // Проверяем, является ли ответ JSON или текстом
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
    console.error('Ошибка на втором этапе регистрации:', error);
    return NextResponse.json(
      { message: 'Произошла ошибка при подтверждении' },
      { status: 500 }
    );
  }
} 