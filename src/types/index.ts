export type ErrorMessage = {
    message: string;
};

export type EmptyObj = Record<string, never>;

export type SuccessMessage = {
    message: 'Success';
};
export * from './sockets';
