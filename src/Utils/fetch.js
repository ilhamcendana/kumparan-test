import axios from "axios"
import { useEffect, useState } from "react";

export const fetchAxiosCore = async (method, url, body, headers = {}) => {
    try {
        const { data } = await axios({
            method: method,
            baseURL: 'https://jsonplaceholder.typicode.com',
            url,
            data: { ...body },
            headers: { ...headers }
        });
        if (data) {
            return { data }
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
        fetching();
    }, []);

    const fetching = async () => {
        const { data } = await fetchAxiosCore(method, url, body, headers);
        resultSet(data);
        isLoadingSet(false);
    }

    return { data: result, isLoading };
}