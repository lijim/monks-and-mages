import { Request, Response, Express } from 'express';

import { Prisma, PrismaClient, User } from '@prisma/client';
import { checkJwt } from '../../authz/checkJWT';
import { getUserFromJWT } from '../../authz';
import { LEVELS } from '../../consts/xpSystem';
import { EmptyObj, ErrorMessage, SuccessMessage } from '@/types';

interface NewUserRequestBodyParams {
    uid: string;
    username: string;
}

interface ChooseAvatarBodyParams {
    avatarUrl: string;
}

const DEFAULT_AVATAR =
    'https://monksandmages.com/images/units/alert-feline.webp';

export const initializeUserEndpoints = (
    server: Express,
    prisma: PrismaClient
) => {
    server.get(
        '/api/users',
        checkJwt,
        async (
            _: Request<EmptyObj, User[], EmptyObj>,
            res: Response<User[]>
        ): Promise<Response<User[]>> => {
            const users = await prisma.user.findMany();
            return res.send(users);
        }
    );

    server.get(
        '/api/users/self',
        checkJwt,
        async (
            req: Request<EmptyObj, User, EmptyObj>,
            res: Response<User | ErrorMessage>
        ) => {
            const user = await getUserFromJWT(req.auth?.token);

            if (!user) {
                return res.status(400).send({ message: 'Need a username' });
            }

            const foundUser = await prisma.user.findUnique({
                where: {
                    username: user.username,
                },
            });

            if (!foundUser) {
                return res.status(204).send({ message: 'No user found' });
            }

            return res.send(foundUser);
        }
    );

    server.patch(
        '/api/users/self/choose_avatar',
        checkJwt,
        async (
            req: Request<EmptyObj, User, ChooseAvatarBodyParams>,
            res: Response<User | ErrorMessage>
        ) => {
            const user = await getUserFromJWT(req.auth?.token);
            const { avatarUrl } = req.body;
            if (!avatarUrl) {
                return res
                    .status(400)
                    .send({ message: 'Need a avatarUrl field' });
            }

            if (!user) {
                return res.status(400).send({ message: 'Need a username' });
            }

            const foundUser = await prisma.user.findUnique({
                where: {
                    username: user.username,
                },
            });

            if (!foundUser) {
                return res.status(204).send({ message: 'No user found' });
            }

            if (avatarUrl !== DEFAULT_AVATAR) {
                const matchingLevel = LEVELS.find(
                    (level) => avatarUrl === level.image
                );
                if (!matchingLevel) {
                    return res
                        .status(204)
                        .send({ message: 'avatarUrl not in available images' });
                }
                if (foundUser.exp < matchingLevel.xpRequired) {
                    return res.status(204).send({
                        message:
                            'avatarUrl not eligible - not high enough of a level',
                    });
                }
            }

            await prisma.user.update({
                where: {
                    username: user.username,
                },
                data: {
                    avatarUrl,
                },
            });

            return res.send(foundUser);
        }
    );

    server.post(
        '/api/users/new_user',
        async (
            req: Request<
                EmptyObj,
                User | ErrorMessage,
                NewUserRequestBodyParams
            >,
            res: Response<User | ErrorMessage>
        ): Promise<Response<User | ErrorMessage>> => {
            const { username, uid } = req.body;
            if (!username || !uid)
                return res
                    .status(400)
                    .send({ message: 'Need both a username and a uid' });

            const apiKey = req.header('x-api-key');
            if (apiKey !== process.env.API_KEY) {
                return res.status(401).send({
                    message: 'Not authorized!  Missing the right API key',
                });
            }

            try {
                const user = await prisma.user.create({
                    data: { username, uid },
                });
                return res.send(user);
            } catch (error) {
                if (
                    error instanceof Prisma.PrismaClientKnownRequestError &&
                    error.code === 'P2002'
                ) {
                    return res.status(400).send({
                        message:
                            'A user with this uid already exists OR this username is already taken',
                    });
                }

                return res.status(400).send({
                    message: 'Something went wrong in creating a user',
                });
            }
        }
    );

    server.delete(
        '/api/users',
        async (
            req: Request<
                EmptyObj,
                SuccessMessage | ErrorMessage,
                { uid: string }
            >,
            res: Response<SuccessMessage | ErrorMessage>
        ): Promise<Response<SuccessMessage | ErrorMessage>> => {
            const { uid } = req.body;

            if (!uid) return res.status(400).send({ message: 'Need a uid' });

            const apiKey = req.header('x-api-key');
            if (apiKey !== process.env.API_KEY) {
                return res.status(401).send({
                    message: 'Not authorized!  Missing the right API key',
                });
            }

            try {
                const deleteUser = prisma.user.delete({
                    where: {
                        uid,
                    },
                });
                const deleteDecks = prisma.savedDeck.deleteMany({
                    where: {
                        userUid: uid,
                    },
                });
                await prisma.$transaction([deleteUser, deleteDecks]);

                return res.send({ message: 'Success' });
            } catch (error) {
                return res.status(400).send({
                    message: `Something went wrong in deleting a user: ${JSON.stringify(
                        error
                    )}`,
                });
            }
        }
    );
};
