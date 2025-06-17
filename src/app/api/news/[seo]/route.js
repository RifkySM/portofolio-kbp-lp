import axiosClient from "@/lib/axiosClient";

export async function GET(request, context) {
    const params = await context.params;
    const { seo } = params;

    try {
        const response = await axiosClient.get(`/post/slug/${seo}`);

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