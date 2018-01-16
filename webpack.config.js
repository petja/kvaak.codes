const path = require('path');
const webpack = require('webpack');

//const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
    entry       : {
        main        : './src/main.jsx',
        //vendor      : ['material-ui'],
    },
    output      : {
        path        : path.join(__dirname, 'public'),
        filename    : './[name].bundle.js',
        publicPath  : '/',
        //sourceMapFilename   : '[file].map',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test        : /\.woff2?$/,
                use         : [
                    {
                        loader      : 'url-loader',
                        options     : {
                            name        : "./fonts/[name].[ext]",
                            //publicPath  : '../',
                        },
                    },
                ],
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-regenerator', 'syntax-dynamic-import'],
                    presets: [
                        [
                            'env',
                            {
                                targets: {
                                    browsers: ['last 2 versions'],
                                }
                            }
                        ],
                        'react'
                    ]
                }
            },
        ]
    },
    plugins: [
        /*new webpack.DefinePlugin({ // <-- key to reducing React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),*/

        /*new webpack.optimize.CommonsChunkPlugin({
            name            : 'vendor',
        }),*/

        /*new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/sw.js'),
        }),*/

        //new webpack.optimize.UglifyJsPlugin(), //minify everything
        //new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
    ],
};
