import axiosClient from "@/lib/axiosClient";

export async function GET(request, context) {
    const ctx_params = await context.params;
    const post_id = ctx_params.post_id;

    try {
        const res = await axiosClient.get(`/post-likes/count/${post_id}`);

        return new Response(JSON.stringify(res.data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error fetching post likes:", error);
        return new Response(JSON.stringify({
            error: "Gagal mengambil jumlah like",
            detail: error.message
        }), {
            status: 500
        });
    }
}
