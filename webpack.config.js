const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const { addDisplayNameTransformer } = require('ts-react-display-name')
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

const styledComponentsTransformer = createStyledComponentsTransformer({
    getDisplayName: (_,bindingName) => `[${bindingName}]`,
});

const serverConfig = {
    entry: {
        server: './src/server/index.ts',
    },
    target: 'node',
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'assets', to: 'public' }
            ]
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    externals: [nodeExternals()],
};

const clientConfig = {
    entry: {
        client: './src/client/index.tsx',
    },
    optimization: {
        minimize: true
    },
    target: 'web',
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    getCustomTransformers: () => ({
                        before: [
                            addDisplayNameTransformer(), 
                            styledComponentsTransformer
                        ]
                    })
                },    
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/server/homepage.html'
        }),
        new Dotenv()
    ],
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist/public/js'),
        clean: true,
    },
};

module.exports = [serverConfig, clientConfig];
