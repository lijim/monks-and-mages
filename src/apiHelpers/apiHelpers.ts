import axios from 'axios';

export const apiClient = axios.create({
    baseURL: process.env.API_DOMAIN,
});

const accessHeaders = (token: string) => ({
    Authorization: `Bearer ${token}`,
});

// needs to be a function b/c cookie can change and we need to dynamically access it
// rather than having it be stale
export const fetcher = ([url, token]: [string, string]) => {
    return axios
        .get(url, {
            headers: accessHeaders(token),
        })
        .then((res) => res.data);
};

export const swrPut = async <Data, Response>(
    [url, token]: [string, string],
    { arg }: { arg: Data }
): Promise<Response> => {
    try {
        const response = await apiClient.put(url, arg, {
            headers: accessHeaders(token),
        });
        return response.data;
    } catch (err) {
        throw err.message;
    }
};

export const swrPatch = async <Data, Response>(
    [url, token]: [string, string],
    { arg }: { arg: Data }
): Promise<Response> => {
    try {
        const response = await apiClient.patch(url, arg, {
            headers: accessHeaders(token),
        });
        return response.data;
    } catch (err) {
        throw err.message;
    }
};
