const path = require('path');

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: './src/index.ts',
    output: {
        library: 'easyCalc',
        libraryTarget: 'umd',
    },

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
    plugins: [],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    }
}