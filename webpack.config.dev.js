const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.config.common.js');

module.exports = merge(common, {
    devServer: {
        contentBase: './',
        hot: true,
        stats: {
            warnings: false
        }
    },
    watch: true,
    devtool: 'source-map',
});

