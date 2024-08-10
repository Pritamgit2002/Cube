import { ImageTypes } from "@/types/image";

const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY;
//calling 27 image per 30 secs to reduce the network call.
const API_URL = `https://api.unsplash.com/photos/random?count=27`;

export async function fetchImages(): Promise<ImageTypes[]> {
    try {
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`
            }
        });

        if (!response.ok) {
            // Log response status and text for debugging
            const errorText = await response.text();
            console.error('Fetch error:', response.status, response.statusText, errorText);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("data", data);

        // Map the response data to the desired format
        return data.map((item: any) => ({
            id: item.id,
            webformatURL: item.urls.small // Adjust as needed for different image sizes
        }));
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}
