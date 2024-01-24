import { Request, Response, Express } from 'express';

import { Prisma, PrismaClient, SavedDeck } from '@prisma/client';
import { EmptyObj, ErrorMessage, SuccessMessage } from '@/types';

export const initializeSavedDeckEndpoints = (
    server: Express,
    prisma: PrismaClient
) => {
    server.get(
        '/api/saved_decks/:username',
        async (
            req: Request<
                { username: string },
                SavedDeck[] | ErrorMessage,
                EmptyObj
            >,
            res: Response<SavedDeck[] | ErrorMessage>
        ): Promise<Response<SavedDeck[] | ErrorMessage>> => {
            const { username } = req.params;

            if (!username)
                return res.status(400).send({ message: 'Need a username' });

            const savedDecks = await prisma.savedDeck.findMany({
                where: { user: { username } },
            });
            return res.send(savedDecks);
        }
    );

    server.post(
        '/api/saved_decks',
        async (
            req: Request<
                EmptyObj,
                SavedDeck | ErrorMessage,
                {
                    deckName: string;
                    skeleton: Prisma.JsonArray;
                    username: string;
                }
            >,
            res: Response<SavedDeck | ErrorMessage>
        ): Promise<Response<SavedDeck | ErrorMessage>> => {
            const { username, deckName, skeleton } = req.body;

            if (!username)
                return res.status(400).send({ message: 'Need a username' });
            if (!deckName)
                return res.status(400).send({ message: 'Need a deck name' });
            if (!skeleton || !Array.isArray(skeleton))
                return res
                    .status(400)
                    .send({ message: 'Need a deck skeleton in JSON form' });

            const user = await prisma.user.findFirst({ where: { username } });
            if (!user)
                return res
                    .status(400)
                    .send({ message: 'No matching user found' });

            const newDeck = await prisma.savedDeck.create({
                data: {
                    userUid: user.uid,
                    name: deckName,
                    skeleton,
                },
            });
            return res.send(newDeck);
        }
    );

    server.delete(
        '/api/saved_decks',
        async (
            req: Request<
                EmptyObj,
                SuccessMessage | ErrorMessage,
                { deckId: string; username: string }
            >,
            res: Response<SuccessMessage | ErrorMessage>
        ) => {
            const { username, deckId } = req.body;

            if (!username)
                return res.status(400).send({ message: 'Need a username' });
            if (!deckId)
                return res.status(400).send({ message: 'Need a deck id' });
            // TODO: add unit tests
            // TODO: add auth0 layer
            try {
                await prisma.savedDeck.deleteMany({
                    where: {
                        user: { username },
                        id: deckId,
                    },
                });
                return res.send({ message: 'Success' });
            } catch (error) {
                return res.status(400).send({
                    message: `Something went wrong in deleting a deck: ${JSON.stringify(
                        error
                    )}`,
                });
            }
        }
    );

    server.delete(
        '/api/saved_decks/all',
        async (
            req: Request<
                EmptyObj,
                SuccessMessage | ErrorMessage,
                { username: string }
            >,
            res: Response<SuccessMessage | ErrorMessage>
        ) => {
            const { username } = req.body;

            if (!username)
                return res.status(400).send({ message: 'Need a username' });
            // TODO: add unit tests
            // TODO: add auth0 layer
            try {
                await prisma.savedDeck.deleteMany({
                    where: {
                        user: { username },
                    },
                });
                return res.send({ message: 'Success' });
            } catch (error) {
                return res.status(400).send({
                    message: `Something went wrong in deleting a deck: ${JSON.stringify(
                        error
                    )}`,
                });
            }
        }
    );
};
