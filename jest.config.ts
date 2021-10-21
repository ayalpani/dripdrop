module.exports = {
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
}