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
                    // options: {
                    //     presets: [
                    //         ["@babel/env",
                    //             {
                    //                 "targets": {
                    //                     "browsers": ["> 1%", "ie >= 11"]
                    //                 },
                    //                 "modules": false,
                    //                 "useBuiltIns": 'usage',
                    //                 "corejs": {
                    //                     "version": "3.8",
                    //                     "proposals": true
                    //                 },
                    //                 // "forceAllTransforms": true, 
                    //             }
                    //         ],
                    //         "@babel/preset-typescript"
                    //     ],
                    //     plugins: [
                    //         [
                    //             "@babel/plugin-transform-runtime",
                    //             {
                    //                 // "helpers": false,
                    //                 "regenerator": true,
                    //                 "corejs": 3,
                    //             }
                    //         ]
                    //     ]
                    // }
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