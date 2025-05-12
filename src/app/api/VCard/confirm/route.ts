import { NextResponse } from 'next/server';

const API_BASE_URL = 'http://87.242.117.38:8080';

export async function POST(request: Request) {
    try {
        const token = request.headers.get('Authorization');

        if (!token) {
            return NextResponse.json(
                { message: 'Необходима авторизация' },
                { status: 401 }
            );
        }

        const body = await request.json();

        const response = await fetch(`${API_BASE_URL}/api/VCard/confirm`, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json().catch(() => ({}));

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error in VCard confirm:', error);
        return NextResponse.json(
            { message: 'Ошибка сервера' },
            { status: 500 }
        );
    }
} 