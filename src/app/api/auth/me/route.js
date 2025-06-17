import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const userData = response.data.data;
        return NextResponse.json({ data: userData });
    } catch (error) {
        const status = error?.response?.status || 500;
        const message = error?.response?.data?.message || "Failed to get user data";
        console.error('error me', error)

        return NextResponse.json({ error: message }, { status });
    }
}
