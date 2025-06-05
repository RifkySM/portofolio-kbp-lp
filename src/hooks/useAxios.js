'use client'

import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../lib/axiosClient';

export default function useAxios({ url, method = 'GET', body = null, options = {}, immediate = true }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (overrideConfig = {}) => {
        setLoading(true);
        try {
            const response = await axiosClient({
                url,
                method,
                data: body,
                ...options,
                ...overrideConfig,
            });
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url, method, body, options]);

    useEffect(() => {
        if (immediate) {
            fetchData();
        }
    }, [fetchData, immediate]);

    return { data, loading, error, fetchData };
}
