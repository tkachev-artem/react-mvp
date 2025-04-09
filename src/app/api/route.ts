import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch('http://87.242.117.38:8080/api/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    return NextResponse.json(
      { message: 'Произошла ошибка при обработке запроса' },
      { status: 500 }
    );
  }
}