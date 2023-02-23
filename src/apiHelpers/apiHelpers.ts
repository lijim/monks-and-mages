import axios from 'axios';
import cookie from 'cookiejs';

export const fetcher = (url: string) => {
    return axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${cookie.get('accessToken')}`,
            },
        })
        .then((res) => res.data);
};
