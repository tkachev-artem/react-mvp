import { NextResponse } from 'next/server';

const API_BASE_URL = 'http://87.242.117.38:8080';

// Маршрут для получения информации о виртуальной карте пользователя
export async function GET(request: Request) {
  try {
    const token = request.headers.get('Authorization');

    if (!token) {
      return NextResponse.json(
        { message: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/api/VCard/info`, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 404) {
      return NextResponse.json({}, { status: 404 });
    }

    const data = await response.json().catch(() => ({}));

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error in VCard info:', error);
    return NextResponse.json(
      { message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
} 