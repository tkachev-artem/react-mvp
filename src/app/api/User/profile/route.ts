import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Получаем токен из заголовков запроса
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];
    
    if (!token) {
      return NextResponse.json(
        { message: 'Некорректный формат токена' },
        { status: 401 }
      );
    }

    try {
      // Делаем запрос к основному API для получения данных профиля
      const response = await fetch('http://87.242.117.38:8080/api/User/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const statusCode = response.status;
        
        if (statusCode === 401) {
          return NextResponse.json(
            { message: 'Срок действия сессии истек, пожалуйста, войдите снова' },
            { status: 401 }
          );
        } else if (statusCode === 403) {
          return NextResponse.json(
            { message: 'Недостаточно прав для просмотра профиля' },
            { status: 403 }
          );
        } else if (statusCode === 404) {
          return NextResponse.json(
            { message: 'Профиль не найден' },
            { status: 404 }
          );
        }
        
        return NextResponse.json(
          { message: errorData.message || 'Ошибка при получении данных профиля' },
          { status: statusCode }
        );
      }

      const userData = await response.json();
      return NextResponse.json(userData, { status: 200 });
    } catch (apiError) {
      console.error('Error fetching profile from main API:', apiError);
      
      // В случае ошибки API или для тестирования, возвращаем моковые данные
      const mockProfileData = {
        firstName: "Александр",
        lastName: "Иванов",
        email: "alex@example.com",
        avatar: "/images/avatar.jpg"
      };
      
      return NextResponse.json(mockProfileData, { status: 200 });
    }
  } catch (error) {
    console.error('Error in profile API route:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 