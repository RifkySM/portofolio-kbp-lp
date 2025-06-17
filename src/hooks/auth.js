import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const useAuthUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = Cookies.get("access_token");

        if (!token) {
            setError("No token found");
            setLoading(false);
            return;
        }

        axios.get("/api/auth/me")
            .then((res) => {
                setUser(res.data.data);
            })
            .catch((err) => {
                setError(err.response?.data?.error || "Failed to fetch user");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { user, loading, error };
};

export default useAuthUser;
