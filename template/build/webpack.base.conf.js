'use strict';
const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
});

module.exports =  {
    context: path.resolve(__dirname, '../'),
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name]-[hash].js'),
        chunkFilename: utils.assetsPath('js/[name]-[hash].js'),
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            // 'vue$': 'vue/dist/vue.esm.js',
            'vue$': 'vue/dist/vue.min.js',
            '@common': resolve('src/common'),
            '@assets': resolve('src/assets'),
            '@components': resolve('src/components'),
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ],
        noParse: [/vue\.min\.js$/]
    },
    externals: {
        topbar: 'topbar.default'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            // use OptimizeCSSAssetsPlugin
            new OptimizeCSSAssetsPlugin({})
        ],
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                },
                /**
                 *  抽离所有样式文件到一个css文件中
                 */
                styles: {
                    name: 'styles',
                    test: /\.(scss|less|css)$/,
                    chunks: 'initial',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
        // make sure to include the plugin!
        new VueLoaderPlugin(),
        new HardSourceWebpackPlugin({
            cachePrune: {
                maxAge: 2 * 24 * 60 * 60 * 1000,
                sizeThreshold: 200 * 1024 * 1024
            }
        })
    ],
    node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
