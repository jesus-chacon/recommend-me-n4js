module.exports = {
    "env": {
        "node": true,
        "es6": true,
        "mocha": true
    },
    "extends": ["eslint:recommended"],
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "rules": {
        "no-console": [
            "error",
            {
                allow: ["log", "error"]
            }
        ],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};