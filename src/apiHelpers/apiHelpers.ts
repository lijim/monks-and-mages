import axios from 'axios';
import cookie from 'cookiejs';

export const apiClient = axios.create({
    baseURL: process.env.API_DOMAIN,
});

const accessHeaders = {
    Authorization: `Bearer ${cookie.get('accessToken')}`,
};

export const fetcher = (url: string) => {
    return axios
        .get(url, {
            headers: accessHeaders,
        })
        .then((res) => res.data);
};

export const swrPut = async <Data, Response>(
    key: string,
    { arg }: { arg: Data }
): Promise<Response> => {
    try {
        const response = await apiClient.put(key, arg, {
            headers: accessHeaders,
        });
        return response.data;
    } catch (err) {
        throw err.message;
    }
};

export const swrPatch = async <Data, Response>(
    key: string,
    { arg }: { arg: Data }
): Promise<Response> => {
    try {
        const response = await apiClient.patch(key, arg, {
            headers: accessHeaders,
        });
        return response.data;
    } catch (err) {
        throw err.message;
    }
};
