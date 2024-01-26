import { Request, Response, Express } from 'express';
import { LEVELS, Level } from '../../consts/xpSystem';
import { EmptyObj } from '@/types';

export const initializeLevelEndpoints = (server: Express) => {
    server.get(
        '/api/levels',
        async (
            _: Request<EmptyObj, Level[], EmptyObj>,
            res: Response<Level[]>
        ): Promise<Response<Level[]>> => {
            return res.send(LEVELS);
        }
    );
};
