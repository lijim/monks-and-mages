/**
 * Natural language helper for joining phrases together, e.g.
 * @param phrases - example: ['hearty', 'quick', 'steady']
 * @returns 'hearty, quick, and steady'
 */
export const joinPhrases = (phrases: string[]) => {
    if (phrases.length === 1) {
        return phrases[0];
    }
    if (phrases.length === 2) {
        return `${phrases[0]} and ${phrases[1]}`;
    }
    if (phrases.length > 2) {
        return `${phrases.slice(0, -1).join(', ')}, and ${
            phrases.slice(-1)[0]
        }`;
    }
    return '';
};
