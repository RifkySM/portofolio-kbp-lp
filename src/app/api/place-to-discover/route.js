import axiosClient from "@/lib/axiosClient";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category_id = searchParams.get('category_id');
    try {
        const response = await axiosClient.get(`place-to-discover/display?category_id=${category_id}`)
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("API Proxy Error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}