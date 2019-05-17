const paths = require('./config/paths')

module.exports = {
    verbose: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    setupFiles: [
        '<rootDir>/node_modules/regenerator-runtime/runtime',
        // '<rootDir>/config/polyfills.js',
    ],
    // setupFilesAfterEnv: ['<rootDir>config/jest/setup.js'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
        '<rootDir>/src/**/*.(spec|test).{js,jsx}',
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
    moduleDirectories: paths.resolveModules,
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
}

