import webpack from 'webpack';
import path from "node:path";
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildMode, BuildPaths, BuildPlatform} from "./config/build/types/types";

interface  EnvVariables {
    mode: BuildMode,
    port: number,
    analyzer?: boolean,
    alias?: string,
    platform?: BuildPlatform,

}
export default (env: EnvVariables) => {
    const paths: BuildPaths = {
       outPut: path.resolve(__dirname, 'build'),
       entry: path.resolve(__dirname, 'src', 'index.tsx'),
       html: path.resolve(__dirname, 'public', 'index.html'),
       src: path.resolve(__dirname, 'src'),
       public: path.resolve(__dirname, 'public')
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        path: paths,
        analyzer: env.analyzer ?? false,
        platform: env.platform ?? 'desktop'
    })
    return config
}