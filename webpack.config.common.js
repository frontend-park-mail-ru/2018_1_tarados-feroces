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
            './src/index.js',
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
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
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
                loader: 'handlebars-loader',
                options: {
                    helperDirs: path.join(__dirname, 'src/app/modules/Helpers'),
                    precompileOptions: {
                        knownHelpersOnly: false,
                    }
                }
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
            {from: path.join(__dirname, 'src/static/images'), to: path.join(outPath, 'images')},
            {from: path.join(__dirname, 'src/static/background_audio.mp3'), to: path.join(outPath, 'background_audio.mp3')},
            {from: path.join(__dirname, 'src/sw.js'), to: path.join(outPath, 'sw.js')}
        ]),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    node: {
        fs: 'empty',
        net: 'empty'
    }
};
