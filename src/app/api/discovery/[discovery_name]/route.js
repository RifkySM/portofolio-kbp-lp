import axiosClient from "@/lib/axiosClient";

export async function GET(request, { params }) {
    const { discovery_name } = params
    try {
        const response = await axiosClient.get(`/discovery/title/${discovery_name}`)
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