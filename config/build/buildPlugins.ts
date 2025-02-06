import webpack, {Configuration, DefinePlugin} from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
export function buildPlugins(options: BuildOptions):Configuration['plugins'] {
    const isDev = options.mode === 'development'
    const isProd = options.mode === 'production'
    const plugins:Configuration['plugins'] = [
        new HtmlWebpackPlugin({ template: options.path.html, favicon: path.resolve(options.path.public, 'favicon.ico') }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(options.platform)
        })
   ]

    if(isDev){
        plugins.push(new webpack.ProgressPlugin())
        plugins.push(new ForkTsCheckerWebpackPlugin())
        //при изменении кода не перегружает страницу+обновляет
        plugins.push(new ReactRefreshPlugin())
    }

    if(isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }))
        //копирует нужные файлы фром->ту, у нас - из локалес - в итоговый билд
        plugins.push( new CopyPlugin({
            patterns: [
                { from: path.resolve(options.path.public, 'locales'), to: options.path.outPut },
            ],
        }),)
    }

    if(options.analyzer){
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}