import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { defaults } = require("jest-config");

export default {
    verbose: true,
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        "^(\\.{1,2}/.*)\\.js$": "$1",
        "^@parser/(.*)$": "<rootDir>/src/parser/$1",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1"
    },
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                useESM: true
            }
        ]
    },
    moduleFileExtensions: [...defaults.moduleFileExtensions,'ts', "mjs"]
};
