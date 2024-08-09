import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            'https://api.pexels.com/v1/search?orientation=square&per_page=9',
            {
                headers: {
                    Authorization: process.env.PEXELS_API_KEY!,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching images:", error instanceof Error ? error.message : error);
        return NextResponse.json({ error: 'Error fetching images' }, { status: 500 });
    }
}
