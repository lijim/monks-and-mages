/**
 * Portover from https://github.com/Thream/socketio-jwt
 * I'd love to directly import their library, but it's shipped in ESM modules
 * which is really incompatible with this project.  I'd have to:
 * - change and support type: "module" on the package.json level
 * - convert every JS build file over to CJS
 * - make the target of the server webpack library web
 * - polyfill all the node-specific libaries
 *
 * I tried it, but it was a 14 file change that became increasingly complex,
 * so I'm just going to hack it by copying over the library as of 3.0.0
 * as it's really only just 90 lines of very well maintained code
 */

import jwt, { Algorithm } from 'jsonwebtoken';
import { Socket } from 'socket.io';

export class UnauthorizedError extends Error {
    public inner: { message: string };

    public data: { code: string; message: string; type: 'UnauthorizedError' };

    constructor(code: string, error: { message: string }) {
        super(error.message);
        this.name = 'UnauthorizedError';
        this.inner = error;
        this.data = {
            message: this.message,
            code,
            type: 'UnauthorizedError',
        };
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export const isUnauthorizedError = (error: any): error is UnauthorizedError => {
    return error.data.type === 'UnauthorizedError';
};

export interface ExtendedSocket<ClientToServerEvents, ServerToClientEvents>
    extends Socket<ClientToServerEvents, ServerToClientEvents> {
    decodedToken?: any;
    encodedToken?: string;
    sub?: any;
}

type SocketIOMiddleware = (
    socket: Socket,
    next: (error?: UnauthorizedError) => void
) => void;

interface CompleteDecodedToken {
    header: {
        [key: string]: any;
        alg: Algorithm;
    };
    payload: any;
}

type SecretCallback = (
    decodedToken: CompleteDecodedToken
) => Promise<string> | string;

export interface AuthorizeOptions {
    algorithms?: Algorithm[];
    onAuthentication?: (decodedToken: any) => Promise<any> | any;
    secret: string | SecretCallback;
}

export const authorize = <ClientToServerEvents, ServerToClientEvents>(
    options: AuthorizeOptions
): SocketIOMiddleware => {
    const { secret, algorithms = ['RS256'], onAuthentication } = options;
    return async (
        socket: ExtendedSocket<ClientToServerEvents, ServerToClientEvents>,
        next
    ) => {
        let encodedToken: string | null = null;
        const { token } = socket.handshake.auth;
        if (token != null) {
            const tokenSplitted = token.split(' ');
            if (tokenSplitted.length !== 2 || tokenSplitted[0] !== 'Bearer') {
                console.log('Format is Authorization: Bearer [token]');
                return next(
                    new UnauthorizedError('credentials_bad_format', {
                        message: 'Format is Authorization: Bearer [token]',
                    })
                );
            }
            encodedToken = tokenSplitted[1];
        }
        if (encodedToken == null) {
            console.log('no token provided');
            return next(
                new UnauthorizedError('credentials_required', {
                    message: 'no token provided',
                })
            );
        }
        socket.encodedToken = encodedToken;
        let keySecret: string | null = null;
        let decodedToken: any;
        if (typeof secret === 'string') {
            keySecret = secret;
        } else {
            const completeDecodedToken = jwt.decode(encodedToken, {
                complete: true,
            });
            keySecret = await secret(
                completeDecodedToken as CompleteDecodedToken
            );
        }
        try {
            decodedToken = jwt.verify(encodedToken, keySecret, { algorithms });
        } catch (error) {
            console.log(error);

            return next(
                new UnauthorizedError('invalid_token', {
                    message: 'Unauthorized: Token is missing or invalid Bearer',
                })
            );
        }
        socket.decodedToken = decodedToken;
        if (onAuthentication != null) {
            try {
                socket.sub = await onAuthentication(decodedToken);
            } catch (error: any) {
                console.log(error);
                return next(error);
            }
        }
        console.log('logged in successfully');
        return next();
    };
};
