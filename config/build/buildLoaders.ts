import {ModuleOptions} from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import ReactRefreshPlugin from "react-refresh-typescript";
export function buildLoaders (options: BuildOptions):ModuleOptions['rules'] {
    const isDev = options.mode === 'development'
    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
            },
        },
    }
    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }
    const tsLoader =  {
            //Ts-loader работает с tsx иначе - babel
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: () =>({
                            //при изменении кода не перегружает страницу+обновляет
                            before: [isDev && ReactRefreshPlugin()].filter(Boolean)
                        })
                    }
                }
            ],
            exclude: /node_modules/,
        }
        const assetsLoader =  {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }

            const svgrLoader = {
                test: /\.svg$/,
                use: [{
                    loader: '@svgr/webpack',
                    options: {
                        icon: true
                    }
                }],
            }
    return [
        assetsLoader,
        scssLoader,
        tsLoader,
        svgrLoader,
    ]
}