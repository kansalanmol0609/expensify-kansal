const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//This function gets called with some argument -- env
//That can be passed with command
module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
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
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            port: 8080
        }
    };
}