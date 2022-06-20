import { v4 as uuidv4 } from 'uuid';
import { SavedDeck } from '@/types/deckBuilder';

export const mockSavedDeck: SavedDeck = {
    createdAt: 12345,
    id: uuidv4(),
    name: 'my first deck',
    skeleton: [{ card: 'Smelting Forge', quantity: 4 }],
    updateAt: 12345,
    userUid: 'auth0Id|a01fde2',
};
