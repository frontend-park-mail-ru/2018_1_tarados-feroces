const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack/webpack.config.common.js');

module.exports = merge(common, {
    watch: true,
    devtool: 'source-map',
});

