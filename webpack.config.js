const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin"); //gzip

module.exports = {
    // mode: 'development',
    mode: 'production',
	// optimization: {
	//     minimize: false
	// },
    // mode: 'none',
    // entry: './src/index.ts',
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'calc-easy.min.js',
        library: 'calcEasy',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                exclude: /(node_modules|lib)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        configFile: path.join(__dirname, 'babel.config.json')
                    }
                },
            },
            // {
            //     test: /\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/
            // },
        ],
    },
    plugins: [
        new CompressionPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    }
}