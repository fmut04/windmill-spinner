// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');

// module.exports = {
//   entry: './src/index.js',
//   mode: 'development',
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'index_bundle.js',
//     publicPath: "/"
//   },
//   target: 'web',
//   devServer: {
//     port: '3000',
//     static: {
//       directory: path.join(__dirname, 'src')
// },
//     open: true,
//     hot: true,
//     liveReload: true,
//   },
//   resolve: {
//     extensions: ['.js', '.jsx', '.json'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/, 
//         exclude: /node_modules/, 
//         use: 'babel-loader', 
//       },
//       {
//         test: /\.html$/,
//         use: "html-loader"
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       }
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, 'public', 'index.html')
//     })
//   ]
// };



// // var path = require('path');
// // var HtmlWebpackPlugin = require('html-webpack-plugin');

// // module.exports = {
// //     entry: './src/index.js',
// //     output: {
// //         path: path.resolve(__dirname, 'dist'),
// //         filename: 'index_bundle.js'
// //     },
// //     module: {
// //         rules: [
// //             { 
// //                 test: /\.(js)$/, 
// //                 use: 'babel-loader' 
// //             },
// //             { 
// //                 test: /\.css$/, 
// //                 use: ['style-loader', 'css-loader'] 
// //             }
// //         ]
// //     },
// //     mode: 'development',
// //     plugins: [

// //         new HtmlWebpackPlugin({
// //             template: 'public/index.html'
// //         })
// //     ]
// // }

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};