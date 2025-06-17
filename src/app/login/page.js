"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" or "error"
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            setIsLoggedIn(true);
            router.replace('/');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessageType("success");
                setMessage("Sign In successful!");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                setMessageType("error");
                setMessage(data.error || "Sign In failed.");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            setMessageType("error");
            setMessage("An unexpected error occurred.");
        }
    };

    return (
        <main className="bg-slate-100">
            <div className="flex py-36 items-center justify-center bg-primary px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <div className="relative w-52 h-32 mx-auto">
                        <Image
                            src="/event/things-to-do/logo.png"
                            alt="Kooba yuk logo"
                            width={213}
                            height={114}
                            className="object-contain"
                        />
                    </div>

                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-[#2b6ca3]">Welcome!</h1>
                        <h2 className="text-xl text-[#2b6ca3] mt-2">Sign in to your account</h2>
                    </div>

                    {/* Notification message */}
                    {message && (
                        <div
                            className={`mb-4 px-4 py-2 rounded text-sm font-medium ${messageType === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-black"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-black pr-10"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-semibold py-2 px-4 rounded bg-[#2b6ca3] hover:bg-[#5a9dd0] transition"
                        >
                            Sign In
                        </button>
                        <Link href="/register">
                            <button
                                type="button"
                                className="mt-2 w-full bg-primary text-white font-semibold py-2 px-4 rounded bg-[#6bb5ee] hover:bg-[#2b6ca3] transition"
                            >
                                Don't have an account? Register now!
                            </button>
                        </Link>
                    </form>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <GoogleAuthButton />
                </div>
            </div>
        </main>
    );
}

const GoogleAuthButton = () => {
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
        console.log("Google login triggered");
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-200 shadow text-black font-semibold py-2 px-4 rounded transition"
        >
            <svg
                className="w-5 h-5"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h146.9c-6.4 34.5-25.4 63.7-54.3 83.2v68.9h87.7c51.4-47.4 81.2-117.4 81.2-197z"
                    fill="#4285F4"
                />
                <path
                    d="M272 544.3c73.4 0 135-24.3 180-65.9l-87.7-68.9c-24.4 16.4-55.6 26-92.3 26-70.9 0-131-47.9-152.5-112.1H31v70.5C76.1 482.2 167.9 544.3 272 544.3z"
                    fill="#34A853"
                />
                <path
                    d="M119.5 323.4c-4.9-14.7-7.7-30.4-7.7-46.4s2.8-31.8 7.7-46.4V160H31C11 198.4 0 243.4 0 277c0 33.6 11 78.6 31 117l88.5-70.6z"
                    fill="#FBBC04"
                />
                <path
                    d="M272 108.6c39.9 0 75.8 13.7 104 40.6l77.6-77.6C407 24.3 345.4 0 272 0 167.9 0 76.1 62.1 31 160l88.5 70.6C141 156.5 201.1 108.6 272 108.6z"
                    fill="#EA4335"
                />
            </svg>
            Sign in with Google
        </button>
    );
};
