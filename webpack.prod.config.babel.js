import path from 'path'

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackChunkHash from 'webpack-chunk-hash'
import WebpackCompressionPlugin from 'compression-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'


export default {
  entry: {
    app: [
      'babel-polyfill',
      path.join(__dirname, 'src', 'index.js'),
    ],
    vendor: [
      'babel-polyfill',
      'react',
      'react-router',
      'react-redux',
      'react-dom',
      'styled-components',
      'redux',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: 'assets/[name].[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8,
    }),
    new HtmlWebpackPlugin({
      title: 'webpack4 Boiler',
      favicon: path.join(__dirname, 'src', 'favicon.ico'),
      template: path.join(__dirname, 'src', 'index.ejs'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
    alias: {
      Components: path.join(__dirname, 'src/components'),
      Containers: path.join(__dirname, 'src/containers'),
      Styles: path.join(__dirname, 'src/styles'),
      Reducers: path.join(__dirname, 'src/reducers'),
      Actions: path.join(__dirname, 'src/actions'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        use: ['file-loader', {
          loader: 'image-webpack-loader',
          options: {
            optipng: {
              enabled: true,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          },
        },
        ],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        use: ['file-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 10 * 1024,
          noquotes: true,
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        use: ['url-loader'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  optimization: {
    concatenateModules: true,
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
          },
        },
      }),
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/,
          priority: 20,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
}
