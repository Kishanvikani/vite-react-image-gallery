export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        // '^.+\\.css$': '<rootDir>/jest-css-modules-transform.ts'
    },
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};