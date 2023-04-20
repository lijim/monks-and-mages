import { v4 as uuidv4 } from 'uuid';
import { SavedDeck } from '@/types/deckBuilder';

export const mockSavedDeck: SavedDeck = {
    createdAt: '2023-03-20T13:29:01.076Z',
    id: uuidv4(),
    name: 'my first deck',
    skeleton: {
        mainBoard: [{ card: 'Smelting Forge', quantity: 4 }],
        sideBoard: [],
    },
    updatedAt: '2023-03-20T13:29:01.076Z',
    userUid: 'auth0Id|a01fde2',
};
