const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.config.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    drop_console: true
                },
                warnings: false
            }
        }),
    ]
});

