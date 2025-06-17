import axiosClient from "@/lib/axiosClient";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    try {
        const url = limit && limit !== '0'
            ? `/free-shuttle-car/display/?limit=${limit}`
            : `/free-shuttle-car/display/`;

        const response = await axiosClient.get(url);
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