/**
 * utility that helps with exhaustively checking in typescript a switch statement
 * based on enums - based on:
 * https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
 */
export const assertUnreachable = (x: never): never => {
    throw new Error(`Didn't expect to get here with ${x}`);
};
