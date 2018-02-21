module.exports = {
    "extends": "google",
    "env": {
        "es6": true,
        "browser": true
    },
    "rules": {
        "no-lonely-if": "off",
        "guard-for-in": "off",
        "no-console": "off",
        "quotes": ["error", "single", {"allowTemplateLiterals": true}],
        "prefer-template": "error",
        "no-plusplus": "off",
        "no-unused-vars": "off",
        "arrow-body-style": "off",
        "no-trailing-spaces": "off",
        "padded-blocks": "off",
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