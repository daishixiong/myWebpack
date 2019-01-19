'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const WebpackAliyunOssPlugin = require('webpack-aliyun-oss-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap(merge(baseWebpackConfig, {
    mode: config.build.mode,
    entry: {
        hospital: './src/hospital/main.js'
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name]_[chunkhash:7].js'),
        chunkFilename: utils.assetsPath('js/[name]_[chunkhash:7].js'),
        publicPath: config.build.assetsPublicPath
    },
    plugins: [
        new CleanWebpackPlugin([config.assetsRoot], { root: path.join(__dirname, '..') }),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/app_[name].css'),
            // use contenthash *
            chunkFilename: utils.assetsPath('css/[name]_[contenthash:7].css')
        }),
        new webpack.DefinePlugin({
            'process.env': require('../config/prod.env')
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        ...(['hospital'].map(function (item) {
            return new HtmlWebpackPlugin({
                filename: `${item}/index.html`,
                template: `src/${item}/index.html`,
                inject: true,
                chunks: ['manifest', 'vendor', 'styles', item],
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
                // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                chunksSortMode: 'dependency'
            });
        })),
        // keep module.id stable when vendor modules does not change
        // new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        // new webpack.optimize.ModuleConcatenationPlugin(),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
        // new WebpackAliyunOssPlugin({
        //     bucket: 'avatar-fe',
        //     region: 'oss-cn-qingdao',
        //     account: 'avatar',
        //     filter: function (asset) {
        //         return !/\.html$/.test(asset);
        //     }
        // })
    ]
}));

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
