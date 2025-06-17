import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
        return NextResponse.json(
            { error: "Missing token" },
            { status: 400 }
        );
    }

    try {
        await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        const status = error?.response?.status || 500;
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to logout";

        console.error("Logout failed:", message);

        return NextResponse.json(
            { error: "Failed to logout", detail: message },
            { status }
        );
    }

    // Delete the cookie
    cookieStore.delete("access_token");

    return NextResponse.redirect(new URL("/", request.url));
}
