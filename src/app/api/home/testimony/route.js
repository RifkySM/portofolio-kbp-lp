import axiosClient from "@/lib/axiosClient";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const limit = searchParams.get("limit");

    try {
        const queryParams = new URLSearchParams();
        if (type) queryParams.append("type", type);
        if (limit) queryParams.append("limit", limit);

        const response = await axiosClient.get(`/testimony/display?${queryParams.toString()}`);
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("API Proxy Error:", error);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}