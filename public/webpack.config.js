const path = require('path');

const PATHS = {
    app: path.join(__dirname, 'index.js'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    entry: {
        app: PATHS.app,
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    devServer: {
        compress: true,
        contentBase: './public'
    }
}