const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + "/",
    entry: './src',
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/dist/',
        filename: 'bundle.js',
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.css', '.json']
    },

    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loader')],
        extensions: ['.json', '.js'],
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel-loader']
            },
            {
                test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				}),
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader?limit:8192&name:[path][name].[ext]',
                    },
                ]

            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                use: 'remove-number-attr'
            }
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        new ExtractTextPlugin({
			filename: '[name].css',
			disable: false,
			allChunks: true,
		}),
    ],
};
