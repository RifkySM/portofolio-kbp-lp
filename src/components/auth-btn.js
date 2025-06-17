"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// Shared hook for checking login state
const useAuthState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get("access_token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        // window.location.href = "/";
    };


    return { isLoggedIn, handleLogout };
};

export const AuthButton = () => {
    const { isLoggedIn, handleLogout } = useAuthState();

    return isLoggedIn ? (
        <button
            onClick={handleLogout}
            className="px-6 py-2.5 rounded-2xl text-white bg-[#F16162] hover:bg-[#FF6062] transition-colors duration-300 ml-4"
        >
            Logout
        </button>
    ) : (
        <Link
            href="/login"
            className="px-6 py-2.5 rounded-2xl text-[#2b6ca3] text-base font-semibold tracking-wider hover:text-white bg-white hover:bg-[#5a9dd0] transition-colors duration-300 ml-4"
        >
            Login
        </Link>
    );
};

export const MiniAuthButton = () => {
    const { isLoggedIn, handleLogout } = useAuthState();

    return isLoggedIn ? (
        <div
            onClick={handleLogout}
            className="flex justify-between items-center cursor-pointer border-b border-gray-500/50 pb-4"
        >
            <span className="text-white font-semibold text-lg">Logout</span>
        </div>
    ) : (
        <Link
            href="/login"
            className="flex justify-between items-center cursor-pointer border-b border-gray-500/50 pb-4"
        >
            <span className="text-white font-semibold text-lg">Login</span>
        </Link>
    );
};
