import axiosClient from "@/lib/axiosClient";

// GET: Cek apakah user sudah like post
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");
    const post_id = searchParams.get("post_id");

    try {
        const res = await axiosClient.get("/post-likes/check", {
            params: {
                user_id,
                post_id
            }
        });

        return new Response(JSON.stringify(res.data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Gagal memeriksa like", detail: error.message }), {
            status: 500
        });
    }
}

// POST: Like a post
export async function POST(request) {
    try {
        const { user_id, post_id } = await request.json();

        const res = await axiosClient.post("/post-likes", {
            user_id,
            post_id
        });

        return new Response(JSON.stringify(res.data), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error liking post:", error);
        return new Response(JSON.stringify({ error: "Gagal menyukai post", detail: error.message }), {
            status: 500
        });
    }
}

// DELETE: Unlike a post
export async function DELETE(request) {
    try {
        const { user_id, post_id } = await request.json();

        const res = await axiosClient.delete("/post-likes", {
            data: { user_id, post_id }
        });

        return new Response(JSON.stringify(res.data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Gagal menghapus like", detail: error.message }), {
            status: 500
        });
    }
}
