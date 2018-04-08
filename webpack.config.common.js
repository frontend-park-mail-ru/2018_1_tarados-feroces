const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outPath = path.join(__dirname, '/dist');

const extractSass = new ExtractTextPlugin({
    filename: 'style.css'
});

module.exports = {
    entry: {
        main: [
            './src/app/index.js',
            './src/static/css/main.scss'
        ]

    },
    output: {
        path: outPath,
        filename: 'bundle.js',
    },

    target: 'web',
    resolve: {
        extensions: ['.js'],
        mainFields: ['browser', 'main'],
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {loader: 'css-loader'},
                        {loader: 'sass-loader'}
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {loader: 'url-loader?limit=10000'}
                ]

            },
            {
                test: /\.handlebars$/,
                use: 'handlebars-loader'
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },

    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html')
        }),
        new CopyWebpackPlugin([
            {from: path.join(__dirname, 'src/static/images'), to: path.join(outPath, 'images')}
        ]),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    node: {
        fs: 'empty',
        net: 'empty'
    }
};
