export interface BuildPaths {
    entry: string;
    html: string;
    outPut: string;
    src: string;
    public: string;
}
export type BuildMode = 'production' | 'development'
export type BuildPlatform = 'mobile' | 'desktop'

export interface  BuildOptions {
    port: number;
    path:BuildPaths;
    mode:BuildMode;
    analyzer?: boolean
    platform: BuildPlatform;
}