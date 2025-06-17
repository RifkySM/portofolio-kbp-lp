import axiosClient from "@/lib/axiosClient";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const body = await request.json();
        const response = await axiosClient.post("/auth/register", body);

        const token = response.data.access_token;

        cookies().set({
            name: "access_token",
            value: token,
            path: "/",
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Register error:", error);

        const status = error?.response?.status || 500;
        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            "Registration failed";

        return new Response(JSON.stringify({ error: message }), {
            status,
            headers: { "Content-Type": "application/json" },
        });
    }
}
