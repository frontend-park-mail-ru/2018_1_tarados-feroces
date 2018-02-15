module.exports = {
    "extends": "google",
    "env": {
        "es6": true,
        "browser": true
    },
    "rules": {
        "no-lonely-if": 0,
        "guard-for-in": 0,
        "no-console": 0,
        "quotes": ["error", "single", {"allowTemplateLiterals": true}],
        "prefer-template": "error",
        "no-plusplus": 0,
        "no-unused-vars": 0,
        "arrow-body-style": 0,
        "padded-blocks": 0,
        "operator-assignment": ["error", "always"],
        "require-jsdoc": ["error", {
        "require": {
            "FunctionDeclaration": false,
            "MethodDefinition": false,
            "ClassDeclaration": false,
            "ArrowFunctionExpression": false,
            "FunctionExpression": false
            }
        }],
        "max-len": ["error", {"code": 120}]
    }
};