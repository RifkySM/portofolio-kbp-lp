import axiosClient from "@/lib/axiosClient";

export async function GET(request, context) {
    const { params } = context;
    const { key } = await params;
    try {
        const response = await axiosClient.get(`/parameter/key/${key}`);
        console.log(response.data.data.content);
        return new Response(JSON.stringify(response.data.data.content), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}