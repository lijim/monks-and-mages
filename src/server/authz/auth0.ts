import { ManagementClient } from 'auth0';

/**
 * This is the management client for verifying on the server side and making calls,
 * e.g. the getUser call to get more information about a user
 */
export const auth0 = new ManagementClient({
    domain: process.env.AUTH0_ISSUER_BASE_URL as string,
    clientId: process.env.AUTH0_WEBSERVER_CLIENT_ID,
    clientSecret: process.env.AUTH0_WEBSERVER_CLIENT_SECRET,
});

auth0.getAccessToken();
