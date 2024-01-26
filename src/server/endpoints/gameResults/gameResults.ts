import { Request, Response, Express } from 'express';

import { GameResult, Prisma, PrismaClient } from '@prisma/client';
import { XP_PER_GAME_PLAYED, XP_PER_GAME_WON } from '../../consts/xpSystem';
import { EmptyObj, ErrorMessage } from '@/types';

type CreateGameResultsBody = {
    guests: string[];
    usernames: string[];
    winningGuests: string[];
    winningUsers: string[];
};

export const initializeGameResultsEndpoints = (
    server: Express,
    prisma: PrismaClient
) => {
    server.post(
        '/api/game_results',
        async (
            req: Request<
                EmptyObj,
                GameResult | ErrorMessage,
                CreateGameResultsBody
            >,
            res: Response<GameResult | ErrorMessage>
        ): Promise<Response<GameResult | ErrorMessage>> => {
            const apiKey = req.header('x-api-key');
            if (apiKey !== process.env.API_KEY) {
                return res.status(401).send({
                    message: 'Not authorized!  Missing the right API key',
                });
            }

            const { guests, usernames, winningGuests, winningUsers } = req.body;

            if (!guests || !Array.isArray(guests))
                return res.status(400).send({ message: 'Need a guests array' });
            if (!usernames || !Array.isArray(usernames))
                return res
                    .status(400)
                    .send({ message: 'Need a usernames array' });
            if (!winningUsers || !Array.isArray(winningUsers))
                return res
                    .status(400)
                    .send({ message: 'Need a winning users array' });
            if (!winningGuests || !Array.isArray(winningGuests))
                return res
                    .status(400)
                    .send({ message: 'Need a winning guests array' });

            const users = await prisma.user.findMany({
                where: { username: { in: usernames } },
            });

            const usersWhoWon = await prisma.user.findMany({
                where: { username: { in: winningUsers } },
            });

            try {
                const gameResultInput: Prisma.GameResultCreateInput = {
                    guests,
                    winningGuests,
                    userPlayers: {
                        connect: users.map((user) => ({ uid: user.uid })),
                    },
                    winningUsers: {
                        connect: usersWhoWon.map((user) => ({ uid: user.uid })),
                    },
                };
                const gameResult = await prisma.gameResult.create({
                    data: gameResultInput,
                });
                users.forEach(async (user) => {
                    const didUserWin = usersWhoWon.some(
                        (userWhoWon) => user.uid === userWhoWon.uid
                    );
                    const newExp =
                        (user.exp || 0) +
                        (didUserWin ? XP_PER_GAME_WON : XP_PER_GAME_PLAYED);
                    const newNumberOfGamesWon =
                        (user.numberOfGamesWon || 0) + (didUserWin ? 1 : 0);
                    await prisma.user.update({
                        where: { uid: user.uid },
                        data: {
                            exp: newExp,
                            numberOfGamesWon: newNumberOfGamesWon,
                        },
                    });
                });
                usersWhoWon.forEach((user) => {
                    user.exp += XP_PER_GAME_WON;
                    user.numberOfGamesWon += 1;
                });
                return res.send(gameResult);
            } catch (error) {
                return res.status(400).send({
                    message: 'Something went wrong in creating the game result',
                });
            }
        }
    );
};
