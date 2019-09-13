const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    // mode: 'development',
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
            // query: {
            //     babelrc: false,  
                // // difference between require and import is that require works dynamically
                // // which means that webpack wouldn't be able to do tree shaking i.e. removing unnecessary packages
                // // in order to prevent babel to convert require into import, we set modules equal to false
            //     presets: [["es2015", {modules: false}], "react", "stage-3"]
            // }
        }, {
            test: /\.s?css$/,
            //Modules in use array are executed from last to first            
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        port: 8080
    }
};
