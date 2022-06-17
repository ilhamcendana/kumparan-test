import axios from "axios"
import { useEffect, useState } from "react";

export const fetchAxiosCore = async (method, url, body, headers = {}) => {
    try {
        const { data, status } = await axios({
            method: method,
            baseURL: 'https://jsonplaceholder.typicode.com',
            url,
            data: { ...body },
            headers: { ...headers }
        });
        if (data || status === 202 || status === 204) {
            return { data, status }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const useFetch = (method, url, body, headers = {}) => {
    const [result, resultSet] = useState(null);
    const [isLoading, isLoadingSet] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            isLoadingSet(true);
        }
        fetching();
    }, [url]);

    const fetching = async () => {
        const { data } = await fetchAxiosCore(method, url, body, headers);
        resultSet(data);
        isLoadingSet(false);
    }

    return { data: result, isLoading };
}