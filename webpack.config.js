const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outPath = path.join('/dist');
const sourcePath = path.join('/src');

module.exports = {
    watch: true,
    devtool: 'source-map',

    context: sourcePath,
    entry: {
        main: 'app/index.js',
    },
    output: {
        path: outPath,
        publicPath: '/',
        filename: 'bundle.js',
    },

    target: 'web',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        mainFields: ['browser', 'main'],
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=10000!img-loader?progressive=true'
            },

            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: Infinity
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css',
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: 'static/images',
                to: 'static/images'
            }
        ])
    ],
    devServer: {
        contentBase: sourcePath,
        hot: true,
        stats: {
            warnings: false
        }
        // TODO: proxy
    },
    node: {
        fs: 'empty',
        net: 'empty'
    }
};