const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: { index: './src/index.js' },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            views: path.resolve(__dirname, 'src/views/'),
            assets: path.resolve(__dirname, 'src/assets/'),
            contexts: path.resolve(__dirname, 'src/contexts/'),
            'routes.js': path.resolve(__dirname, 'src/routes.js'),
        },
        extensions: ['.js', '.ts', '.tsx', '.json', '.jsx'],
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.ProvidePlugin({
            "React": "react",
         }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
            favicon: './public/favicon.ico'
        })
    ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['@babel/env', ["@babel/preset-react", { "runtime": "automatic" }]]
            }
        }, {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        }, {
            test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
            exclude: /node_modules/,
            use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
        }],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    }
};