import { auth0 } from './auth0';

// parses the JWT token and uses auth0's node module to determine the user
export const getUserFromJWT = async (token = '.') => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const buff = Buffer.from(base64, 'base64');
        const payloadinit = buff.toString('ascii');
        const payload = JSON.parse(payloadinit);

        const user = await auth0.getUser({
            id: payload.sub,
        });
        return user;
    } catch {
        return null;
    }
};
