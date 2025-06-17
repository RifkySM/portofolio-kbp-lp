import axiosClient from "@/lib/axiosClient";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    try {
        const url = limit && limit !== '0'
            ? `/routes/display/?limit=${limit}`
            : `/routes/display/`;

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