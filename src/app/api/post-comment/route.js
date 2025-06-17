import axiosClient from "@/lib/axiosClient";
import { cookies } from "next/headers";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const post_id = searchParams.get("post_id");
    const page = searchParams.get("page");

    if (!post_id || !page) {
        return new Response(JSON.stringify({ error: "Missing post_id or page parameter" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const response = await axiosClient.get(
            `/post-comment?post_id=${post_id}&paginate=true&page=${page}&limit=10`
        );
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("GET comment error:", error?.response?.data || error.message);
        return new Response(
            JSON.stringify({
                error: "Internal Server Error",
                detail: error?.response?.data || error.message,
            }),
            {
                status: error?.response?.status || 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { post_id, comment } = body;

        const token = cookies().get("access_token")?.value;

        if (!token) {
            return new Response(
                JSON.stringify({ error: "Unauthorized: Missing token" }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const response = await axiosClient.post(
            "/post-comment",
            { post_id, comment },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return new Response(JSON.stringify(response.data), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Post comment error:", error?.response?.data || error.message);
        return new Response(
            JSON.stringify({
                error: "Failed to post comment",
                detail: error?.response?.data || error.message,
            }),
            {
                status: error?.response?.status || 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
