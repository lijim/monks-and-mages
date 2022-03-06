/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/styleMock.js",
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: [
        "<rootDir>/setupTests.ts"
    ]
};
