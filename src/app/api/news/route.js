import axiosClient from "@/lib/axiosClient"

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || 1;

    try {
        const response = await axiosClient.get('post', {
            params: {
                category: 'news',
                paginate: true,
                page,
                limit: 9,
            },
        });

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("API Proxy Error:", error);
        return new Response(JSON.stringify({
            message: "Internal Server Error",
            error: error.message,
        }), {
            status: 500,
        });
    }
}
