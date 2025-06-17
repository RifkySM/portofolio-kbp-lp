import { NextResponse } from "next/server";
import axiosClient from "@/lib/axiosClient";

export async function POST(req) {
    try {
        const body = await req.json();

        const { name, email, phone, feedback } = body;
        if (!name || !email || !phone || !feedback) {
            return NextResponse.json({ message: "All fields are required." }, { status: 400 });
        }

        const response = await axiosClient.post("/feedback", body);

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error("Feedback route error:", error.message);
        return NextResponse.json(
            {
                message: "Failed to send feedback.",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
