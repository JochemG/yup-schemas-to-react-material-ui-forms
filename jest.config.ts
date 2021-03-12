import type {InitialOptionsTsJest} from 'ts-jest/dist/types'

const config: InitialOptionsTsJest = {
    collectCoverage: true,
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsConfig: '<rootDir>/tsconfig.json'
            }
        ],
    },
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy",
        "^lodash-es$": "lodash"
    }
};
export default config;