import { Request, Response, Express } from 'express';

import { Prisma, PrismaClient, SavedDeck } from '@prisma/client';
import { checkJwt } from '../../authz/checkJWT';
import { getUserFromJWT } from '../../authz/getUserFromJWT';
import { EmptyObj, ErrorMessage, SuccessMessage } from '@/types';

export const initializeSavedDeckEndpoints = (
    server: Express,
    prisma: PrismaClient
) => {
    server.get(
        '/api/saved_decks/:username',
        checkJwt,
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

            const user = await getUserFromJWT(req.auth?.token);

            if (!user) {
                return res.status(400).send({ message: 'Need a username' });
            }

            if (user.username !== username) {
                return res.status(401).send({
                    message: `Hey! You can not see another user's decks!`,
                });
            }

            const savedDecks = await prisma.savedDeck.findMany({
                where: { user: { username } },
            });
            return res.send(savedDecks);
        }
    );

    server.post(
        '/api/saved_decks',
        checkJwt,
        async (
            req: Request<
                EmptyObj,
                SavedDeck | ErrorMessage,
                {
                    deckName: string;
                    skeleton: Prisma.JsonObject;
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
            if (
                !skeleton ||
                !Array.isArray(skeleton.mainBoard) ||
                !Array.isArray(skeleton.sideBoard)
            )
                return res
                    .status(400)
                    .send({ message: 'Need a deck skeleton in JSON form' });

            const userFromAuth0 = await getUserFromJWT(req.auth?.token);

            if (!userFromAuth0) {
                return res.status(400).send({ message: 'Need a username' });
            }

            if (userFromAuth0.username !== username) {
                return res.status(401).send({
                    message: `Hey! You can not create another user's decks!`,
                });
            }

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

    server.patch(
        '/api/saved_decks',
        checkJwt,
        async (
            req: Request<
                EmptyObj,
                SavedDeck | ErrorMessage,
                { deckId: string; skeleton: Prisma.JsonObject }
            >,
            res: Response<SavedDeck | ErrorMessage>
        ): Promise<Response<SavedDeck | ErrorMessage>> => {
            const { deckId, skeleton } = req.body;

            if (!deckId)
                return res.status(400).send({ message: 'Need a deck id' });
            if (
                !skeleton ||
                !Array.isArray(skeleton.mainBoard) ||
                !Array.isArray(skeleton.sideBoard)
            )
                return res
                    .status(400)
                    .send({ message: 'Need a deck skeleton in JSON form' });

            const userFromAuth0 = await getUserFromJWT(req.auth?.token);

            if (!userFromAuth0) {
                return res.status(400).send({ message: 'Need a username' });
            }

            const user = await prisma.user.findFirst({
                where: { username: userFromAuth0.username },
            });
            if (!user)
                return res
                    .status(400)
                    .send({ message: 'No matching user found' });

            const deck = await prisma.savedDeck.findFirst({
                where: {
                    id: deckId,
                },
            });

            if (!deck) {
                return res
                    .status(400)
                    .send({ message: 'No matching deck found' });
            }
            if (deck.userUid !== user.uid) {
                return res
                    .status(401)
                    .send({ message: "Cannot update another user's deck!" });
            }

            const newDeck = await prisma.savedDeck.update({
                where: {
                    id: deckId,
                },
                data: {
                    skeleton,
                },
            });
            return res.send(newDeck);
        }
    );

    server.delete(
        '/api/saved_decks',
        checkJwt,
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

            const userFromAuth0 = await getUserFromJWT(req.auth?.token);

            if (!userFromAuth0) {
                return res.status(400).send({ message: 'Need a username' });
            }

            if (userFromAuth0.username !== username) {
                return res.status(401).send({
                    message: `Hey! You can not delete another user's decks!`,
                });
            }

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

            const userFromAuth0 = await getUserFromJWT(req.auth?.token);

            if (!userFromAuth0) {
                return res.status(400).send({ message: 'Need a username' });
            }

            if (userFromAuth0.username !== username) {
                return res.status(401).send({
                    message: `Hey! You can not delete another user's decks!`,
                });
            }

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
