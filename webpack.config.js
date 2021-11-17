require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = {
    entry: {
        main: "./assets/main.js",
    },

    output: {
        path: path.resolve(__dirname, "public/build"),
        filename: "js/[name].js",
        publicPath: "build/",
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: ["@babel/plugin-proposal-object-rest-spread"],
                },
            },
        ],
    },

    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({filename: "css/[name].css,"})
    ],
}

