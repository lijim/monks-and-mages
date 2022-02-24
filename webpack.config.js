const path = require('path');
const { addDisplayNameTransformer } = require('ts-react-display-name')
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

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
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

const clientConfig = {
    entry: {
        client: './src/client/index.tsx',
    },
    target: 'web',
    mode: 'production',
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
};

module.exports = [serverConfig, clientConfig];
