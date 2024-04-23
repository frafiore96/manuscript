const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './main/index.html',
            favicon: './src/img/favicon.ico'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|webp)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.ico$/i,
                type: 'asset/resource'
              }
        ]
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        open: true,
    }
}