export type User = {
    auth0Id?: string;
    id?: string;
    isDisconnected?: boolean; // if true, user has lost connection with server
    name?: string;
};
