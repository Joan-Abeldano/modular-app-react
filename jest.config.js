module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    testMatch: ['**/__tests__/**/*.test.js'],
    collectCoverageFrom: [
        'src/components/**/*.{js,jsx}',
        '!src/components/**/*.test.{js,jsx}'
    ],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    transformIgnorePatterns: [
        '/node_modules/(?!react-router-dom)/'
    ],
    moduleDirectories: ['node_modules', 'src'],
    resolver: undefined
};