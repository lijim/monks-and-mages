const path = require('path');
const { addDisplayNameTransformer } = require('ts-react-display-name')
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const nodeExternals = require('webpack-node-externals');

const styledComponentsTransformer = createStyledComponentsTransformer({
    getDisplayName: (_,bindingName) => `[${bindingName}]`,
});

const serverConfig = {
    entry: {
        server: './src/server/index.ts',
    },
    target: 'node',
    mode: 'production',
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
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
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
    /* plugins: [
        new BundleAnalyzerPlugin()
    ], */
    target: 'web',
    mode: 'production',
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
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/public/js'),
    },
};

module.exports = [serverConfig, clientConfig];
