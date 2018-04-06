const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack/webpack.config.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    plugins: [
        new UglifyJsPlugin({
            parallel: 4,
        }),
    ]
});

