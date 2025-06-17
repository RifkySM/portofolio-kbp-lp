import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
        return NextResponse.redirect(new URL("/login?error=missing_token", req.url));
    }

    cookies().set({
        name: "access_token",
        value: token,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 1,
    });

    return NextResponse.redirect(new URL("/", req.url));
}
