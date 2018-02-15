module.exports = {
    "extends": "google",
    "env": {
        "es6": true,
        "browser": true
    },
    "rules": {
        "no-lonely-if": false,
        "guard-for-in": false,
        "no-console": false,
        "quotes": ["error", "single", {"allowTemplateLiterals": true}],
        "prefer-template": "error",
        "no-plusplus": false,
        "no-unused-vars": false,
        "arrow-body-style": false,
        "padded-blocks": false,
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